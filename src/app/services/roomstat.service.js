"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var RoomstatService = (function () {
    function RoomstatService(http) {
        this.http = http;
    }
    RoomstatService.prototype.getRoomstat = function (room) {
        this.http.get('/rooms')
            .subscribe(function (data) {
            console.log(data);
        }, function (err) {
            console.log(err);
        });
    };
    RoomstatService.prototype.addRoomstat = function (room) {
        this.http.post('/rooms', {
            categoryId: room.categoryId,
            roomId: room.roomId,
            count: room.count,
            hostId: room.hostId,
            duration: room.duration
        })
            .subscribe(function (data) {
            console.log(data);
        }, function (err) {
            console.log(err);
        });
    };
    RoomstatService.prototype.deleteRoomstat = function (room) {
        this.http.delete("/rooms/" + room.roomId);
    };
    return RoomstatService;
}());
RoomstatService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], RoomstatService);
exports.RoomstatService = RoomstatService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vbXN0YXQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJvb21zdGF0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0Msc0NBQXdEO0FBR3hELElBQWEsZUFBZTtJQUUxQix5QkFBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07SUFBSSxDQUFDO0lBRW5DLHFDQUFXLEdBQVgsVUFBWSxJQUFJO1FBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDO2FBQ3RCLFNBQVMsQ0FBQyxVQUFDLElBQUk7WUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ25CLENBQUMsRUFBRSxVQUFDLEdBQUc7WUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ2xCLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELHFDQUFXLEdBQVgsVUFBWSxJQUFJO1FBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ3ZCLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtZQUMzQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbkIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7U0FDeEIsQ0FBQzthQUNELFNBQVMsQ0FBQyxVQUFDLElBQUk7WUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ25CLENBQUMsRUFBRSxVQUFDLEdBQUc7WUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ2xCLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELHdDQUFjLEdBQWQsVUFBZSxJQUFJO1FBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVUsSUFBSSxDQUFDLE1BQVEsQ0FBQyxDQUFBO0lBQzNDLENBQUM7SUFDSCxzQkFBQztBQUFELENBQUMsQUEvQkQsSUErQkM7QUEvQlksZUFBZTtJQUQzQixpQkFBVSxFQUFFO3FDQUdlLFdBQUk7R0FGbkIsZUFBZSxDQStCM0I7QUEvQlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwLCBSZXNwb25zZSwgSGVhZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUm9vbXN0YXRTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHApIHsgfVxuICBcbiAgZ2V0Um9vbXN0YXQocm9vbSkge1xuICAgIHRoaXMuaHR0cC5nZXQoJy9yb29tcycpXG4gICAgLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICB9LCAoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgfSlcbiAgfVxuXG4gIGFkZFJvb21zdGF0KHJvb20pIHtcbiAgICB0aGlzLmh0dHAucG9zdCgnL3Jvb21zJywge1xuICAgICAgY2F0ZWdvcnlJZDogcm9vbS5jYXRlZ29yeUlkLFxuICAgICAgcm9vbUlkOiByb29tLnJvb21JZCxcbiAgICAgIGNvdW50OiByb29tLmNvdW50LFxuICAgICAgaG9zdElkOiByb29tLmhvc3RJZCxcbiAgICAgIGR1cmF0aW9uOiByb29tLmR1cmF0aW9uXG4gICAgfSlcbiAgICAuc3Vic2NyaWJlKChkYXRhKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgIH0sIChlcnIpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICB9KVxuICB9XG5cbiAgZGVsZXRlUm9vbXN0YXQocm9vbSkge1xuICAgIHRoaXMuaHR0cC5kZWxldGUoYC9yb29tcy8ke3Jvb20ucm9vbUlkfWApXG4gIH1cbn1cbiJdfQ==