import React from 'react';

function TestCase({ result, description }) {
    const icon = result ? '✔' : '✖';
    const color = result ? '#4CAF50' : '#F44336';
    const styles = {fontWeight: 'bold', color};
    return (
        <div style={styles}>
            {`${icon} ${description}`}
        </div>
    );
}

export default TestCase;