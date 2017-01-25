module.exports = {
	AppName: 'MarcoPlaats API',
	AppVersion: '1.0.0',
	Database:{
		// Url: 'mongodb://localhost:27017/MarcoPlaats',
		Url: 'mongodb://marcoplaats.maarten.co.uk:5432/MarcoPlaats',
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
		// ClientUrl: 'http://marcoplaats.maarten.co.uk' // Must be without a slash on the end.
		ClientUrl: 'http://localhost' // Must be without a slash on the end.
	},
	Encryption: {
		algorithm: "aes-256-ctr",
		password: "Marco123Plaats"
	},
	Roles: ['user', 'admin', 'blocked']
};