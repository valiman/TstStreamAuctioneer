# TstStreamAuctioneer
Streamers from eg. Twitch & Youtube can auction their hosting

### Dev. plan/thoughts:
1) Create entire frontend first, with angularjs & jquery, add tmp data. (done)
2) Create supporting backend, with SignalR & MVC/MySQL/API
	
### Separation of projects, in VS.
	* Website
	* Database & API: ip/api/ctrl/method/id
	* SignalR

### Login
	OAuth (Twitch)
### User
	List Auctions (Done JS. Should be available for all.)
		* Bid (Done JS.)
		* BuyOut (Done JS.)
	Create Auction (Done JS.)
		* Start date (passive, on create)
		* Title (passive, Twitch-channel name)
		* Details (max chars: 140)
		* Stop date (passive, 48 hours.)
		* Channel & data taken from twitch-api
	History 
		* Bid List
		* Auctions (Re-create w/ same settings: option)

### Database:
	Models; code first!
		* **Auction**:	id, startDate, endDate, bidPrice, buyoutPrice, User(c# obj)
		* **User**:		id, creationDate, List<Auction> (c# list), oauthstuff..
		* **UserStats**:	id, statsDate, userId, avgViewers
		* **Bid**:		id, userId, auctionId, bidPrice

### Note to self:
	* Create the frontend first, then add the backend. Easier!
	* Use 'Postman' to create the API project; easier to test calls/returns!
	* Let the database and API be on the same server/project, easier to manage!
	* Now that we've got frontend and backend separated, we can add other forms of applications to this; WPF/Moble app! 
