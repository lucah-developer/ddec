/* En desarrollo, /media apunta a las fotos reales.
   public/media/empresas y public/media/obras quedan como texto en Windows
   porque Git no puede materializar los symlinks. */
const path = require("path");
const express = require("express");

module.exports = function (app) {
  const opts = {
    fallthrough: false,
    index: false,
    redirect: false,
    dotfiles: "ignore",
    maxAge: "1h",
  };
  app.use("/media/empresas", express.static(path.join(__dirname, "Empresas"), opts));
  app.use("/media/obras", express.static(path.join(__dirname, "OBRAS"), opts));
};
