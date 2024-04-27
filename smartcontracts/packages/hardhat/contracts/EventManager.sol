// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

/*
 * @title EventManager
 * @dev Manages event creation and details.
 */
contract EventManager {
	struct Event {
		string name;
		string description;
		string imageHash; // IPFS hash of the event's image
		string location; // Latitude and longitude: "lat, long"
		address owner;
		uint256 startTime; // Unix timestamp
		uint256 endTime; // Unix timestamp
		bool active;
	}

	struct EventData {
		string name;
		string description;
		string imageHash;
		string location;
		uint256 startTime;
		uint256 endTime;
		bool active;
	}

	Event[] public events;

	event EventCreated(uint256 indexed eventId, string name, address owner);

	// Modifier to ensure only the owner can perform an action
	modifier onlyOwner(uint256 _eventId) {
		require(
			msg.sender == events[_eventId].owner,
			"Only the owner can perform this action"
		);
		_;
	}

	// Modifier to ensure event exists
	modifier eventExists(uint256 _eventId) {
		require(_eventId < events.length, "Event does not exist");
		_;
	}

	// Modifier for validating event data
	modifier validEventData(EventData memory data) {
		require(
			bytes(data.name).length > 0 && bytes(data.name).length <= 128,
			"Invalid name"
		);
		require(
			bytes(data.description).length > 0 &&
				bytes(data.description).length <= 1024,
			"Invalid description"
		);
		require(bytes(data.imageHash).length == 46, "Invalid IPFS hash");
		require(bytes(data.location).length > 0, "Invalid location");
		require(data.startTime < data.endTime, "Invalid time range");
		_;
	}

	function _setEvent(
		uint256 _eventId,
		EventData memory data,
		bool _isNewEvent
	) private {
		Event memory newEvent = Event({
			name: data.name,
			description: data.description,
			imageHash: data.imageHash,
			location: data.location,
			owner: msg.sender,
			startTime: data.startTime,
			endTime: data.endTime,
			active: data.active
		});

		if (_isNewEvent) {
			events.push(newEvent);
			emit EventCreated(events.length - 1, data.name, msg.sender);
		} else {
			events[_eventId] = newEvent;
		}
	}

	function createEvent(
		string calldata _name,
		string calldata _description,
		string calldata _imageHash,
		string calldata _location,
		uint256 _startTime,
		uint256 _endTime
	) external {
		EventData memory data = EventData({
			name: _name,
			description: _description,
			imageHash: _imageHash,
			location: _location,
			startTime: _startTime,
			endTime: _endTime,
			active: true
		});

		_setEvent(0, data, true);
	}

	function updateEvent(
		uint256 _eventId,
		string calldata _name,
		string calldata _description,
		string calldata _imageHash,
		string calldata _location,
		uint256 _startTime,
		uint256 _endTime,
		bool _active
	) external eventExists(_eventId) onlyOwner(_eventId) {
		EventData memory data = EventData({
			name: _name,
			description: _description,
			imageHash: _imageHash,
			location: _location,
			startTime: _startTime,
			endTime: _endTime,
			active: _active
		});

		_setEvent(_eventId, data, false);
	}

	function getEvent(uint256 _eventId) external view returns (Event memory) {
		return events[_eventId];
	}

	function getAllEvents() external view returns (Event[] memory) {
		return events;
	}
}
