// pages/logs/Logs.tsx
import { useState, useEffect } from 'react';
import './report.scss';

interface WazuhLog {
  id: string;
  timestamp: string;
  ruleId: string;
  agentId: string;
  level: string;
  description: string;
  sourceIp?: string;
  action?: string;
}

const Report = () => {
  const [logs, setLogs] = useState<WazuhLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Connect to your local Wazuh VM
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setIsLoading(true);
        
        // Replace with your VM's IP and Wazuh API credentials
        const response = await fetch('http://YOUR_VM_IP:55000/logs', {
          headers: {
            'Authorization': 'Basic ' + btoa('wazuh-user:your-password')
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch logs');
        
        const data = await response.json();
        setLogs(data.data.items); // Adjust based on Wazuh API response format
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    // Initial fetch
    fetchLogs();

    // Set up polling every 10 seconds
    const interval = setInterval(fetchLogs, 10000);
    return () => clearInterval(interval);
  }, []);

  // Filter logs based on user selection
  const filteredLogs = logs.filter(log => {
    const matchesFilter = filter === 'all' || log.level === filter;
    const matchesSearch = searchQuery === '' || 
      Object.values(log).some(val => 
        val?.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesFilter && matchesSearch;
  });

  // Format timestamp
  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleString();
  };

  // Get alert level color
  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high': return '#ff4d4f';
      case 'medium': return '#faad14';
      case 'low': return '#52c41a';
      default: return '#d9d9d9';
    }
  };

  return (
    <div className="logs-page">
      <div className="logs-header">
        <h2>Wazuh Security Logs</h2>
        <p className="subtitle">Real-time alerts from your Wazuh server</p>
      </div>

      <div className="logs-controls">
        <div className="filter-controls">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Alerts</option>
            <option value="high">High Severity</option>
            <option value="medium">Medium Severity</option>
            <option value="low">Low Severity</option>
          </select>
          
          <input
            type="text"
            placeholder="Search logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        
        <button 
          onClick={() => window.location.reload()}
          className="refresh-btn"
        >
          Refresh
        </button>
      </div>

      {isLoading ? (
        <div className="loading-indicator">Loading logs...</div>
      ) : error ? (
        <div className="error-message">
          Error: {error}
          <p>Ensure your Wazuh VM is running and accessible</p>
        </div>
      ) : filteredLogs.length === 0 ? (
        <div className="empty-state">No logs matching your criteria</div>
      ) : (
        <div className="logs-container">
          <div className="logs-table">
            <div className="table-header">
              <div>Timestamp</div>
              <div>Rule ID</div>
              <div>Agent ID</div>
              <div>Level</div>
              <div>Description</div>
              <div>Source IP</div>
            </div>
            
            {filteredLogs.map(log => (
              <div key={log.id} className="log-entry">
                <div>{formatDate(log.timestamp)}</div>
                <div>{log.ruleId}</div>
                <div>{log.agentId}</div>
                <div>
                  <span 
                    className="level-badge"
                    style={{ backgroundColor: getLevelColor(log.level) }}
                  >
                    {log.level}
                  </span>
                </div>
                <div className="log-description">{log.description}</div>
                <div>{log.sourceIp || 'N/A'}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Report;