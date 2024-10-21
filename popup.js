const heavySites = [
    "https://www.youtube.com",
    "https://www.netflix.com",
    "https://www.cnn.com",
    "https://www.bbc.com",
    "https://www.nytimes.com",
    "https://www.amazon.com",
    "https://www.ebay.com",
    "https://www.facebook.com",
    "https://www.instagram.com",
    "https://www.twitter.com",
    "https://www.tiktok.com",
    "https://www.spotify.com",
    "https://www.reddit.com",
    "https://www.quora.com",
    "https://www.twitch.tv",
    "https://www.medium.com",
    "https://www.imgur.com",
    "https://www.flickr.com",
    "https://www.soundcloud.com",
    "https://www.hulu.com",
    "https://www.adobe.com/creativecloud.html",
    "https://www.artstation.com",
    "https://www.behance.net",
    "https://www.canva.com",
    "https://www.shopify.com",
    "https://www.wix.com",
    "https://www.squarespace.com",
    "https://www.wordpress.com",
    "https://www.khanacademy.org",
    "https://www.coursera.org",
    "https://www.codecademy.com",
    "https://www.github.com",
    "https://www.dribbble.com",
    "https://www.webmd.com",
    "https://www.glassdoor.com",
    "https://www.yelp.com",
    "https://www.tripadvisor.com",
    "https://www.zillow.com",
    "https://www.airbnb.com",
    "https://www.expedia.com",
    "https://www.booking.com",
    "https://www.indeed.com",
    "https://www.monster.com",
    "https://www.udemy.com",
    "https://www.skillshare.com",
    "https://www.ted.com",
    "https://www.nationalgeographic.com",
    "https://www.nasa.gov",
    "https://www.500px.com",
    "https://www.unsplash.com",
    "https://www.shutterstock.com",
    "https://www.envato.com",
    "https://www.autotrader.com",
    "https://www.cargurus.com",
    "https://www.cnet.com",
    "https://www.techcrunch.com",
    "https://www.wired.com",
    "https://www.theverge.com",
    "https://www.mashable.com",
    "https://www.vice.com",
    "https://www.vox.com",
    "https://www.ign.com",
    "https://www.gamespot.com",
    "https://www.epicgames.com",
    "https://www.steampowered.com",
    "https://www.discord.com",
    "https://www.slack.com",
    "https://www.trello.com",
    "https://www.notion.so",
    "https://www.asana.com",
    "https://www.google.com/drive/",
    "https://www.office.com",
    "https://www.dropbox.com",
    "https://www.onedrive.com",
    "https://www.box.com",
    "https://www.lastpass.com",
    "https://www.1password.com",
    "https://www.mailchimp.com",
    "https://www.constantcontact.com",
    "https://www.surveymonkey.com",
    "https://www.typeform.com",
    "https://www.mindmeister.com",
    "https://www.figma.com",
    "https://www.zapier.com",
    "https://www.gotomeeting.com",
    "https://www.webex.com",
    "https://www.zoom.us",
    "https://www.meetup.com",
    "https://www.canva.com",
    "https://www.miro.com",
    "https://www.salesforce.com",
    "https://www.mailchimp.com",
    "https://www.constantcontact.com",
    "https://www.litmus.com",
    "https://www.activecampaign.com",
    "https://www.infusionsoft.com",
    "https://www.wunderlist.com",
    "https://www.smartdraw.com",
    "https://www.visme.co",
    "https://www.sparkpost.com",
    "https://www.screencast.com",
    "https://www.wevideo.com",
    "https://www.vimeo.com",
    "https://www.daz3d.com",
    "https://www.cinema4d.com",
    "https://www.autodesk.com",
    "https://www.blender.org",
    "https://www.dreamstime.com",
    "https://www.pixabay.com"
];

// Load heavy sites button functionality
document.getElementById('loadHeavySitesBtn').addEventListener('click', () => {
    heavySites.forEach(url => {
        chrome.tabs.create({ url: url });
    });
});

// Open button functionality
document.getElementById('openBtn').addEventListener('click', () => {
    const urls = document.getElementById('urls').value.split('\n');
    const openMethod = document.getElementById('openMethod').value;
    const repeatCount = parseInt(document.getElementById('repeatCount').value) || 1;

    for (let i = 0; i < repeatCount; i++) {
        urls.forEach(url => {
            url = url.trim();
            if (url) {
                // Ensure the URL starts with http or https
                if (!/^https?:\/\//i.test(url)) {
                    url = 'http://' + url; // Default to http if not provided
                }
                if (openMethod === 'same') {
                    chrome.tabs.create({ url: url });
                } else if (openMethod === 'new') {
                    chrome.windows.create({ url: url });
                }
            }
        });
    }
});

// Increase button functionality
document.getElementById('increaseBtn').addEventListener('click', () => {
    const input = document.getElementById('repeatCount');
    input.value = parseInt(input.value) + 1;
});

// Decrease button functionality
document.getElementById('decreaseBtn').addEventListener('click', () => {
    const input = document.getElementById('repeatCount');
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
});

// Export button functionality
document.getElementById('exportBtn').addEventListener('click', () => {
    const urls = document.getElementById('urls').value.split('\n').filter(url => url.trim());
    const blob = new Blob([JSON.stringify(urls)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'url_list.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

// Import button functionality
document.getElementById('importBtn').addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = e => {
            const urls = JSON.parse(e.target.result);
            document.getElementById('urls').value = urls.join('\n');
        };
        reader.readAsText(file);
    };
    input.click();
});
