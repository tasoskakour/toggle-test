export const extractEmailsFromFile = (file) => {
    return new Promise((resolve, reject) => {
        try {
            const reader = new FileReader();
            reader.addEventListener('load', (e) => {
                const text = e.target.result;
                if (text) {
                    return resolve(text.trim().split('\n'));
                }
                return resolve([]);
            });
            reader.readAsText(file);
        } catch (error) {
            console.error(error);
            reject(error);
        }
    });
};

export const unique = (arr) => [...new Set(arr)];
