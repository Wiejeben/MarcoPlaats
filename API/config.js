var Config = {
  Database:{
    Url: 'mongodb://db:27017/MarcoPlaats',
  },
  Application: {
    name: 'Marcoplaats API',
    version: '1.0.0'
  },
  OAuth: {
    clientID: "410268495427-8i08t1h9qas8n13c1ngk9oeo8vfr2fb7.apps.googleusercontent.com",
    clientSecret: "tL7PbeaGz6z-FupnCP4PIZ1h",
    callbackURL: "http://localhost:8080/auth/google/callback"
  },
  Misc: {
    ClientUrl: 'http://marcoplaats.maarten.co.uk' // Must be without a slash on the end.
    // ClientUrl: 'marcoplaats.dev' // Must be without a slash on the end.
  },
    Roles: ['user', 'admin', 'blocked']
};



module.exports = Config;
