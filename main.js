
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');



let mainWindow;

function createWindow () {
  // Creo la ventana de la aplicación
  mainWindow = new BrowserWindow({width: 1024, height: 720});

  //Cargo el html de inicio de la app
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));


 //Controla  el evento de cierre de la ventana
  mainWindow.on('closed', function () {

    mainWindow = null
  })
}

//Evento al estar la app lista y cargada (Crea la ventana)
app.on('ready', createWindow);


//Controla cuando cerramos todas las ventanas de la app (en mi caso solo hay una) tiene en cuenta
// a mac osx que va a su rollo
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

//Controla lo que pasa cuando "recreo la ventana que he cerrado" Solo en OSX
app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
});

