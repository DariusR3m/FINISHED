// src/pages/rules/Rules.tsx
import { useState, useEffect } from 'react';
import './rules.scss';

interface WazuhRule {
  id: string;
  name: string;
  description: string;
  level: string;
  condition: string;
  action: string;
}

const Rules = () => {
  const [rules, setRules] = useState<WazuhRule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // New rule form state
  const [newRule, setNewRule] = useState({
    name: '',
    description: '',
    level: '5',
    condition: '',
    action: ''
  });

  // Fetch existing rules from Wazuh server
  useEffect(() => {
    const fetchRules = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://YOUR_VM_IP:55000/rules', {
          headers: {
            'Authorization': 'Basic ' + btoa('wazuh-user:your-password')
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch rules');
        
        const data = await response.json();
        setRules(data.data.items); // Adjust based on Wazuh API response
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRules();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewRule(prev => ({ ...prev, [name]: value }));
  };

  // Submit new rule to Wazuh server
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://YOUR_VM_IP:55000/rules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('wazuh-user:your-password')
        },
        body: JSON.stringify(newRule)
      });

      if (!response.ok) throw new Error('Failed to add rule');

      // Refresh rules list
      const updatedResponse = await fetch('http://YOUR_VM_IP:55000/rules', {
        headers: {
          'Authorization': 'Basic ' + btoa('wazuh-user:your-password')
        }
      });
      const updatedData = await updatedResponse.json();
      setRules(updatedData.data.items);
      
      // Reset form
      setNewRule({
        name: '',
        description: '',
        level: '5',
        condition: '',
        action: ''
      });
      setShowAddForm(false);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add rule');
    }
  };

  return (
    <div className="rules-page">
      <div className="rules-header">
        <h2>Wazuh Rules Management</h2>
        <p className="subtitle">Create and manage security rules for your Wazuh server</p>
      </div>

      <div className="rules-actions">
        <button 
          className="add-rule-btn"
          onClick={() => setShowAddForm(true)}
        >
          + Add New Rule
        </button>
      </div>

      {showAddForm && (
        <div className="add-rule-form">
          <h3>Add New Rule</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Rule Name</label>
              <input
                type="text"
                name="name"
                value={newRule.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={newRule.description}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Severity Level</label>
              <select
                name="level"
                value={newRule.level}
                onChange={handleInputChange}
              >
                <option value="1">1 - Low</option>
                <option value="5">5 - Medium</option>
                <option value="10">10 - High</option>
                <option value="12">12 - Critical</option>
              </select>
            </div>

            <div className="form-group">
              <label>Condition (XML format)</label>
              <textarea
                name="condition"
                value={newRule.condition}
                onChange={handleInputChange}
                placeholder="<if_sid>...</if_sid>"
                required
              />
            </div>

            <div className="form-group">
              <label>Action (XML format)</label>
              <textarea
                name="action"
                value={newRule.action}
                onChange={handleInputChange}
                placeholder="<group>...</group>"
                required
              />
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                className="cancel-btn"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </button>
              <button type="submit" className="submit-btn">
                Save Rule
              </button>
            </div>
          </form>
        </div>
      )}

      {isLoading ? (
        <div className="loading">Loading rules...</div>
      ) : error ? (
        <div className="error">Error: {error}</div>
      ) : (
        <div className="rules-list">
          <div className="rules-table-header">
            <div>Name</div>
            <div>Description</div>
            <div>Level</div>
            <div>Actions</div>
          </div>
          
          {rules.length === 0 ? (
            <div className="empty">No rules found</div>
          ) : (
            rules.map(rule => (
              <div key={rule.id} className="rule-item">
                <div>{rule.name}</div>
                <div>{rule.description}</div>
                <div>
                  <span className={`level-badge level-${rule.level}`}>
                    {rule.level}
                  </span>
                </div>
                <div>
                  <button className="delete-btn">Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Rules;