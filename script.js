document.addEventListener('DOMContentLoaded', function() {
    const bootScreen = document.getElementById('boot-screen');
    const desktop = document.getElementById('desktop');
    const startupSound = document.getElementById('startup-sound');

    // Simulate boot screen for a few seconds, then show desktop and play sound
    setTimeout(() => {
        bootScreen.style.display = 'none';
        desktop.style.display = 'block';
        startupSound.play();
    }, 3000); // Adjust the duration of the boot screen as needed

    const windows = document.querySelectorAll('.window');
    windows.forEach(win => {
        const closeButton = win.querySelector('.close');
        const minimizeButton = win.querySelector('.minimize');
        const maximizeButton = win.querySelector('.maximize');
        const titleBar = win.querySelector('.window-title-bar');

        closeButton.addEventListener('click', function() {
            win.style.display = 'none';
        });

        minimizeButton.addEventListener('click', function() {
            win.style.display = 'none';
            addToTaskbar(win);
        });

        maximizeButton.addEventListener('click', function() {
            if (win.classList.contains('maximized')) {
                win.classList.remove('maximized');
                win.style.width = '400px';
                win.style.height = '300px';
                win.style.top = '50px';
                win.style.left = '50px';
            } else {
                win.classList.add('maximized');
                win.style.width = '100%';
                win.style.height = 'calc(100% - 40px)';
                win.style.top = '0';
                win.style.left = '0';
            }
        });

        let isDragging = false, offsetX, offsetY;
        titleBar.addEventListener('mousedown', function(e) {
            isDragging = true;
            offsetX = e.clientX - win.offsetLeft;
            offsetY = e.clientY - win.offsetTop;
            win.style.zIndex = 20;
        });

        document.addEventListener('mousemove', function(e) {
            if (isDragging) {
                win.style.left = (e.clientX - offsetX) + 'px';
                win.style.top = (e.clientY - offsetY) + 'px';
            }
        });

        document.addEventListener('mouseup', function() {
            isDragging = false;
            win.style.zIndex = 10;
        });
    });

    function addToTaskbar(win) {
        const windowTitle = win.querySelector('.window-title-bar span').textContent;
        const taskbarButton = document.createElement('div');
        taskbarButton.className = 'taskbar-button';
        taskbarButton.textContent = windowTitle;
        taskbarButton.dataset.windowId = win.id; // Assign window ID for reference
        taskbarButton.addEventListener('click', function() {
            win.style.display = 'block';
            taskbarButton.remove();
        });
        document.getElementById('taskbar-buttons').appendChild(taskbarButton);
    }

    const startButton = document.querySelector('.start-button img');
    const startMenu = document.getElementById('start-menu');

    startButton.addEventListener('click', function() {
        startMenu.style.display = startMenu.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', function(event) {
        if (!startButton.contains(event.target) && !startMenu.contains(event.target)) {
            startMenu.style.display = 'none';
        }
    });

    const menuItems = document.querySelectorAll('.start-menu .menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const action = this.getAttribute('data-function');
            startMenu.style.display = 'none';
            handleMenuAction(action);
        });
    });

    function handleMenuAction(action) {
        switch(action) {
            case 'programs':
                alert('Programs clicked');
                break;
            case 'documents':
                alert('Documents clicked');
                break;
            case 'settings':
                alert('Settings clicked');
                break;
            case 'find':
                alert('Find clicked');
                break;
            case 'help':
                alert('Help clicked');
                break;
            case 'run':
                alert('Run clicked');
                break;
            case 'shutdown':
                alert('Shut Down clicked');
                break;
            default:
                alert('Unknown action');
        }
    }

    const desktopIcons = document.querySelectorAll('.desktop-icon');
    desktopIcons.forEach(icon => {
        let isDragging = false, iconOffsetX, iconOffsetY;

        icon.addEventListener('mousedown', function(e) {
            isDragging = true;
            iconOffsetX = e.clientX - icon.offsetLeft;
            iconOffsetY = e.clientY - icon.offsetTop;
        });

        document.addEventListener('mousemove', function(e) {
            if (isDragging) {
                icon.style.left = (e.clientX - iconOffsetX) + 'px';
                icon.style.top = (e.clientY - iconOffsetY) + 'px';
            }
        });

        document.addEventListener('mouseup', function() {
            isDragging = false;
        });

        icon.addEventListener('dblclick', function() {
            const windowId = icon.getAttribute('data-target');
            const targetWindow = document.getElementById(windowId);
            if (targetWindow) {
                targetWindow.style.display = 'block';
                targetWindow.style.zIndex = 20;
            }
        });
    });

    // Context menu element
    const contextMenu = document.getElementById('context-menu');

    // Function to show context menu
    function showContextMenu(e, menuItems) {
        contextMenu.innerHTML = '';
        menuItems.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.className = 'context-menu-item';
            menuItem.textContent = item.label;
            menuItem.dataset.action = item.action;
            contextMenu.appendChild(menuItem);
        });

        contextMenu.style.left = `${e.pageX}px`;
        contextMenu.style.top = `${e.pageY}px`;
        contextMenu.style.display = 'block';
    }

    // Event listener for desktop right-click
    document.getElementById('desktop').addEventListener('contextmenu', function(e) {
        e.preventDefault();
        showContextMenu(e, [
            { label: 'View', action: 'view' },
            { label: 'Refresh', action: 'refresh' },
            { label: 'Paste', action: 'paste' },
            { label: 'Properties', action: 'properties' }
        ]);
    });

    // Event listener for icons right-click
    desktopIcons.forEach(icon => {
        icon.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            showContextMenu(e, [
                { label: 'Open', action: 'open' },
                { label: 'Delete', action: 'delete' },
                { label: 'Properties', action: 'properties' }
            ]);
        });
    });

    // Hide context menu when clicking elsewhere
    document.addEventListener('click', function(e) {
        if (!contextMenu.contains(e.target)) {
            contextMenu.style.display = 'none';
        }
    });

    // Handle menu item actions
    contextMenu.addEventListener('click', function(e) {
        const action = e.target.dataset.action;
        handleContextMenuAction(action);
        contextMenu.style.display = 'none';
    });

    // Function to handle context menu actions
    function handleContextMenuAction(action) {
        switch(action) {
            case 'open':
                alert('Open action triggered');
                break;
            case 'delete':
                alert('Delete action triggered');
                break;
            case 'properties':
                alert('Properties action triggered');
                break;
            case 'view':
                alert('View action triggered');
                break;
            case 'refresh':
                alert('Refresh action triggered');
                break;
            case 'paste':
                alert('Paste action triggered');
                break;
            default:
                alert('Unknown action');
        }
    }

    // Update clock function and initial call
    function updateClock() {
        const clockElement = document.querySelector('.clock');
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        clockElement.textContent = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    }
    setInterval(updateClock, 1000);
    updateClock();
});

