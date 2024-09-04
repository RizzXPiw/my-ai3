const fetch = require('node-fetch');

async function aiResponse(text) {
    const headers = {
        "Accept": "*/*",
        "Accept-Language": "id-ID,en;q=0.5",
        "Referer": "https://www.blackbox.ai/",
        "Content-Type": "application/json",
        "Origin": "https://www.blackbox.ai",
        "Alt-Used": "www.blackbox.ai"
    };

    const data = {
        messages: [{ id: m.sender, role: 'user', content: text }],
        agentMode: { mode: true, id: "RizzPiw365XA8z", name: "RizzPiw" },
        previewToken: null,
        userId: "",
        codeModelMode: true,
        trendingAgentMode: {},
        isMicMode: false,
        maxTokens: 1024,
        webSearchMode: false,
        promptUrls: "",
        isChromeExt: false,
        githubToken: null
    };

    try {
        const blackboxResponse = await fetch('https://www.blackbox.ai/api/chat', {
            method: "POST",
            headers,
            body: JSON.stringify(data)
        });

        let blackboxData = await blackboxResponse.text();
        blackboxData = blackboxData.replace(/\$\@.*?\$\@|\*\*|\$/g, '');
        console.log(blackboxData);
        return blackboxData;
    } catch (error) {
        console.error("Error fetching data:", error);
        return `Eror : ${error.message}`;
    }
}

module.exports = { aiResponse };