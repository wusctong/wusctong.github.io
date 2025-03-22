const audioSrcs = [
    "media/music/2THINK.wav",
    "media/music/CHILL.m4a",
    "media/music/Introducing....wav",
    "media/music/Moonlight.wav",
    "media/music/UNDER THE MOON.m4a",
    "media/music/confusedA.wav",
    "media/music/HAPPY FACE.m4a",
    "media/music/COIN.m4a"
]
const titles = ["2THINK.wav", "CHILL.m4a", "Introducing....wav", "Moonlight.wav", "UNDER THE MOON.m4a", "confusedA.wav", "HAPPY FACE.m4a", "COIN.m4a"];


function createTab(title, src) {
    const tab = document.createElement('div');
    tab.className = 'tab';
    
    const cover = document.createElement('img');
    cover.src = 'media/image/coverPlaceholder.svg';
    
    const info = document.createElement('div');
    info.className = 'info';
    
    const label = document.createElement('div');
    label.className = 'label';
    label.textContent = title;
    
    const audio = document.createElement('audio');
    audio.src = src;
    audio.controls = true;
    
    info.appendChild(label);
    info.appendChild(audio);
    tab.appendChild(cover);
    tab.appendChild(info);
    
    return tab;
}

function addTabs() {
    const playList = document.getElementById('playList');
    
    for (var i = 0; i < audioSrcs.length; i++) {
        const tab = createTab(titles[i], audioSrcs[i]);
        playList.appendChild(tab);
    }
}

window.onload = addTabs;
