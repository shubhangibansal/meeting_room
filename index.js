"use strict";

var meetRoom = require('./meetRoom');

module.exports = function(app){

/**
*    ** API to login into the system
*    session is created for the current user
*
* @request
* {"user":"ADMIN"}
*
*
**/

app.post('/login',meetRoom.userLogin, meetRoom.error);

/**
 *	**API to logout from the subsystem
 * session is destroyed for the current user
 * 
 *
 */
app.post('/logout', meetRoom.userLogout, meetRoom.error);

/**
 *	**API to book Meeting Room
 *	@param {hh:mm:ss} [s_time] [start time of the meeting]
 *	@param {integer} [duration] [duration of the meeting to be conducted in minutes]
 *	@param {yyyy:mm:dd} [s_date] [start date of the meeting to be conducted]
 *	@param {string} [subject] [topic of discussion]
 *
 *  @request :
 * http://localhost.enuke.com:3333/bookMeetRoom
 *
 * {	 "user":"user1",
 *		 "calendarid":1,
 *		 "s_time": "09:12:00",
 *		 "duration":30,
 *		 "s_date":"2016-06-01",
 *		 "subject":"to discuss node"
 *	}
 *
 * @response :
 *
 * {
 *	"message": "Booking made successfully with mid : 1"
 * }
 * 
 */
app.post('/bookMeetRoom', meetRoom.bookMeet, meetRoom.error);

/**
 *	**API to Cancel the meeting Room
 *
 * @request :
 * http://localhost.enuke.com:3333/cancelMeetRoom
 *
 * {	 "user":"user1",
 *		 "calendarid":1,
 *		 "mid" : 1
 *	}
 *
 * @response :
 *
 * {
 *	"message": "Cancellation done successfully for calendar id : 1"
 * }
 * 
 */
app.post('/cancelMeetRoom', meetRoom.cancelMeet, meetRoom.error);

/**
 * API to get the total count of the users in session
 * returns count of the sessions in redis
 *
 * @request:
 * http://localhost.enuke.com:3333/countUsers
 *
 * @response
 * {
 *	"Users_count": 4
 *	}
 * 
 */

app.get('/countUsers', meetRoom.usersInSession, meetRoom.error);

/**
 * GET user list in session 
 * as query param pass : getList = 1;
 *
 * @request:
 * http://localhost.enuke.com:3333/getUsersList?getList=1
 *
 * @response
 * list : [ { ADMIN: { cookie: [Object], username: 'ADMIN', isLogin: true } } ]
 *
 * 
 */
app.get('/getUsersList', meetRoom.usersInSession, meetRoom.getUsersList, meetRoom.displayList, meetRoom.error);

};