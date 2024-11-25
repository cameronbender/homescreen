// Encrypt button handler
document.getElementById('encrypt-btn').addEventListener('click', () => {
    const input = document.getElementById('encrypt-input').value.trim();
    if (input) {
        const encrypted = btoa(input); // Simple Base64 encoding
        document.getElementById('encrypt-output').textContent = encrypted;
    } else {
        document.getElementById('encrypt-output').textContent = 'No input provided.';
    }
});

// Decrypt button handler
document.getElementById('decrypt-btn').addEventListener('click', () => {
    const input = document.getElementById('decrypt-input').value.trim();
    try {
        if (input) {
            const decrypted = atob(input); // Simple Base64 decoding
            document.getElementById('decrypt-output').textContent = decrypted;
        } else {
            document.getElementById('decrypt-output').textContent = 'No input provided.';
        }
    } catch (error) {
        document.getElementById('decrypt-output').textContent = 'Invalid encrypted message.';
    }
});

// Add keyword button handler
document.getElementById('add-keyword-btn').addEventListener('click', async () => {
    const keyword = document.getElementById('keyword-input').value.trim();
    if (keyword) {
        await fetch('/add_keyword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ keyword }),
        });
        alert(`Keyword "${keyword}" added!`);
        document.getElementById('keyword-input').value = '';
    }
});

// Delete keyword button handler
document.getElementById('delete-keyword-btn').addEventListener('click', async () => {
    const keyword = document.getElementById('delete-keyword-input').value.trim();
    if (keyword) {
        const response = await fetch('/delete_keyword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ keyword }),
        });
        const result = await response.json();
        if (result.success) {
            alert(`Keyword "${keyword}" deleted!`);
        } else {
            alert(`Keyword "${keyword}" not found!`);
        }
        document.getElementById('delete-keyword-input').value = '';
    }
});

// View Word Bank
document.getElementById('view-word-bank').addEventListener('click', async () => {
    const response = await fetch('/view_word_bank');
    const keywords = await response.json();
    alert(`Word Bank: ${keywords.join(', ')}`);
});