var express = require('express');
var router = express.Router();
var ibmdb = require('ibm_db');
global.dbConnString = "DATABASE=BLUDB;HOSTNAME=awh-yp-small02.services.dal.bluemix.net;PORT=50000;PROTOCOL=TCPIP;UID=dash101613;PWD=57T8D7vcSLRS;"
router.get('/TEMP', function(req, res) {
	ibmdb.open(dbConnString, function(err, conn) {
		if (err) {
			console.error("Error:", err);
			return;
		} else {
			var query = "SELECT TS,TEMP from IOT_TEMP ORDER BY TS";
			conn.query(query, function(err, rows) {
				if (err) {
					console.log("Error: ", err);
					return;
				} else {
					res.json(rows);
					conn.close(function(){
						console.log("Connection closed successfully_TEMP.");
					});
				}
			});
		}
	});
});

router.get('/ID_MAXofTEMP', function(req, res) {
	ibmdb.open(dbConnString, function(err, conn) {
		if (err) {
			console.error("Error:", err);
			return;
		} else {
			var query = "SELECT TS,TEMP FROM IOT_TEMP WHERE ID=(SELECT MAX(id) FROM IOT_TEMP);";
			conn.query(query, function(err, rows) {
				if (err) {
					console.log("Error: ", err);
					return;
				} else {
					res.json(rows);
					conn.close(function(){
						console.log("Connection closed successfully_TEMP_MAX.");
					});
				}
			});
		}
	});
});

router.get('/HUM', function(req, res) {
	ibmdb.open(dbConnString, function(err, conn) {
		if (err) {
			console.error("Error:", err);
			return;
		} else {
			var query = "SELECT TS,HUMIDITY from IOT_HUM ORDER BY TS";
			conn.query(query, function(err, rows) {
				if (err) {
					console.log("Error: ", err);
					return;
				} else {
					res.json(rows);
					conn.close(function(){
						console.log("Connection closed successfully_HUM.");
					});
				}
			});
		}
	});
});

router.get('/ID_MAXofHUM', function(req, res) {
	ibmdb.open(dbConnString, function(err, conn) {
		if (err) {
			console.error("Error:", err);
			return;
		} else {
			var query = "SELECT TS,HUMIDITY FROM IOT_HUM WHERE ID=(SELECT MAX(id) FROM IOT_HUM);";
			conn.query(query, function(err, rows) {
				if (err) {
					console.log("Error: ", err);
					return;
				} else {
					res.json(rows);
					conn.close(function(){
						console.log("Connection closed successfully_HUM_MAX.");
					});
				}
			});
		}
	});
});
module.exports = router;