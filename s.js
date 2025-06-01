const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/fb', async (req, res) => {
    try {
        const facebookUrl = req.query.url;
        if (!facebookUrl) {
            return res.status(400).json({ error: 'Facebook URL is required as query parameter "url"' });
        }

        // Prepare the payload
        const payload = new URLSearchParams();
        payload.append('id', facebookUrl);
        payload.append('locale', 'en');

        // Make the POST request to getmyfb.com
        const response = await axios.post('https://getmyfb.com/process', payload.toString(), {
            headers: {
                'authority': 'getmyfb.com',
                'method': 'POST',
                'path': '/process',
                'scheme': 'https',
                'accept': '*/*',
                'accept-encoding': 'gzip, deflate, br, zstd',
                'accept-language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7',
                'content-length': payload.toString().length,
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'cookie': '__cflb=0H28vwyfhACcZteBqmh4duvZ364xFvNpxr5BLypFLRZ',
                'hx-current-url': 'https://getmyfb.com/',
                'hx-request': 'true',
                'hx-target': 'target',
                'hx-trigger': 'form',
                'origin': 'https://getmyfb.com',
                'priority': 'u=1, i',
                'referer': 'https://getmyfb.com/',
                'sec-ch-ua': '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36'
            }
        });

        // Initialize response object with empty values
        const result = {
            title: "",
            videoUrls: {}
        };

        // Parse the HTML response
        console.log(response)
        const $ = cheerio.load(response.data);
        
        // Only set title if the element exists
        const titleElement = $('.results-item-text').first();
        if (titleElement.length) {
            result.title = titleElement.text().trim();
        }
        
        // Only add video URLs if they exist
        $('.results-list-item').each((index, element) => {
            const text = $(element).text().trim();
            const downloadLink = $(element).find('a').attr('href');
            
            if (text && downloadLink) {
                // Check for video quality indicators
                const qualityMatch = text.match(/(\d+p)/);
                if (qualityMatch && qualityMatch[1]) {
                    result.videoUrls[qualityMatch[1]] = downloadLink;
                }
            }
        });

        res.json(result);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            title: "",
            videoUrls: {},
            error: 'An error occurred while processing the request' 
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});