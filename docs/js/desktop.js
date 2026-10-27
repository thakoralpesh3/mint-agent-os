// Linux Mint Cinnamon 22.3 Desktop & Window Manager
const WindowManager = {
  highestZ: 100,
  activeWindow: null,
  windows: {},

  init() {
    this.setupClock();
    this.setupStartMenu();
    this.setupGlobalHotkeys();
    this.setupDesktopIcons();
  },

  setupClock() {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const el = document.getElementById('trayClock');
      if (el) el.innerText = `${hours}:${mins}`;
    };
    updateTime();
    setInterval(updateTime, 1000);
  },

  setupStartMenu() {
    const btn = document.getElementById('startMenuBtn');
    const menu = document.getElementById('startMenu');
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = menu.style.display === 'flex';
      menu.style.display = isOpen ? 'none' : 'flex';
      btn.classList.toggle('active', !isOpen);
    });

    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !btn.contains(e.target)) {
        menu.style.display = 'none';
        btn.classList.remove('active');
      }
    });
  },

  setupGlobalHotkeys() {
    document.addEventListener('keydown', (e) => {
      // Super + Space or Ctrl + Space -> Summon HUD
      if ((e.metaKey && e.code === 'Space') || (e.ctrlKey && e.code === 'Space')) {
        e.preventDefault();
        this.toggleHUD();
      }
      // ESC closes HUD
      if (e.key === 'Escape') {
        const hud = document.getElementById('hudOverlay');
        if (hud) hud.style.display = 'none';
      }
    });
  },

  toggleHUD() {
    const hud = document.getElementById('hudOverlay');
    if (!hud) return;
    const isVisible = hud.style.display === 'flex';
    hud.style.display = isVisible ? 'none' : 'flex';
    if (!isVisible) {
      const inp = document.getElementById('hudInput');
      if (inp) {
        inp.value = '';
        inp.focus();
      }
    }
  },

  setupDesktopIcons() {
    document.querySelectorAll('.desktop-icon').forEach(icon => {
      icon.addEventListener('dblclick', () => {
        const appId = icon.dataset.app;
        if (appId) this.openApp(appId);
      });
      icon.addEventListener('click', () => {
        document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
        icon.classList.add('selected');
      });
    });
    document.getElementById('desktop').addEventListener('click', (e) => {
      if (e.target.id === 'desktop') {
        document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
      }
    });
  },

  openApp(appId) {
    const win = document.getElementById(`win-${appId}`);
    if (!win) return;

    win.style.display = 'flex';
    win.classList.remove('minimized');
    this.bringToFront(win);
    this.updateTaskbar();

    // App-specific initialization
    if (appId === 'terminal') {
      const inp = win.querySelector('.term-input');
      if (inp) inp.focus();
    }
  },

  bringToFront(win) {
    this.highestZ += 1;
    win.style.zIndex = this.highestZ;
    document.querySelectorAll('.window').forEach(w => w.classList.remove('active'));
    win.classList.add('active');
    this.activeWindow = win;
    this.updateTaskbar();
  },

  minimizeWindow(winId) {
    const win = document.getElementById(winId);
    if (win) {
      win.classList.add('minimized');
      this.updateTaskbar();
    }
  },

  minimizeAllWindows() {
    const allWindows = document.querySelectorAll('.window');
    const anyVisible = Array.from(allWindows).some(w => w.style.display === 'flex' && !w.classList.contains('minimized'));
    allWindows.forEach(w => {
      if (anyVisible) {
        w.classList.add('minimized');
      } else if (w.style.display === 'flex') {
        w.classList.remove('minimized');
      }
    });
    this.updateTaskbar();
  },

  maximizeWindow(winId) {
    const win = document.getElementById(winId);
    if (!win) return;
    if (win.dataset.maximized === 'true') {
      win.style.top = win.dataset.origTop;
      win.style.left = win.dataset.origLeft;
      win.style.width = win.dataset.origWidth;
      win.style.height = win.dataset.origHeight;
      win.dataset.maximized = 'false';
    } else {
      win.dataset.origTop = win.style.top || '100px';
      win.dataset.origLeft = win.style.left || '150px';
      win.dataset.origWidth = win.style.width || '650px';
      win.dataset.origHeight = win.style.height || '450px';

      win.style.top = '0px';
      win.style.left = '0px';
      win.style.width = '100vw';
      win.style.height = 'calc(100vh - 42px)';
      win.dataset.maximized = 'true';
    }
    this.bringToFront(win);
  },

  closeWindow(winId) {
    const win = document.getElementById(winId);
    if (win) {
      win.style.display = 'none';
      this.updateTaskbar();
    }
  },

  updateTaskbar() {
    const tasksContainer = document.getElementById('panelTasks');
    if (!tasksContainer) return;
    tasksContainer.innerHTML = '';

    document.querySelectorAll('.window').forEach(win => {
      if (win.style.display === 'flex') {
        const title = win.querySelector('.window-title span')?.innerText || 'App';
        const icon = win.dataset.icon || '🍃';
        const isMin = win.classList.contains('minimized');
        const isActive = win === this.activeWindow && !isMin;

        const btn = document.createElement('div');
        btn.className = `task-item ${isActive ? 'active' : ''}`;
        btn.innerHTML = `<span>${icon}</span> <span>${title}</span>`;
        btn.addEventListener('click', () => {
          if (isMin) {
            win.classList.remove('minimized');
            this.bringToFront(win);
          } else if (win === this.activeWindow) {
            this.minimizeWindow(win.id);
          } else {
            this.bringToFront(win);
          }
        });
        tasksContainer.appendChild(btn);
      }
    });
  },

  makeDraggable(win) {
    const bar = win.querySelector('.window-titlebar');
    if (!bar) return;

    let isDragging = false;
    let startX, startY, origX, origY;

    bar.addEventListener('mousedown', (e) => {
      if (e.target.classList.contains('win-btn')) return;
      isDragging = true;
      this.bringToFront(win);
      startX = e.clientX;
      startY = e.clientY;
      const rect = win.getBoundingClientRect();
      origX = rect.left;
      origY = rect.top;

      const onMouseMove = (moveEvt) => {
        if (!isDragging) return;
        const dx = moveEvt.clientX - startX;
        const dy = moveEvt.clientY - startY;
        win.style.left = `${origX + dx}px`;
        win.style.top = `${Math.max(0, origY + dy)}px`;
      };

      const onMouseUp = () => {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    win.addEventListener('mousedown', () => this.bringToFront(win));
  }
};

window.addEventListener('DOMContentLoaded', () => {
  WindowManager.init();
  document.querySelectorAll('.window').forEach(w => WindowManager.makeDraggable(w));
});
