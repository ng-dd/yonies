"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var FriendService = (function () {
    function FriendService(http) {
        this.http = http;
    }
    FriendService.prototype.getFriend = function (friend) {
        this.http.get('/friends')
            .subscribe(function (data) {
            console.log(data);
        }, function (err) {
            console.log(err);
        });
    };
    FriendService.prototype.addFriend = function (friend) {
        this.http.post('/friends', {
            userId: friend.userId,
            friendId: friend.friendID
        });
    };
    FriendService.prototype.deleteMessage = function (friend) {
        this.http.delete("/friends/" + friend.id);
    };
    return FriendService;
}());
FriendService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], FriendService);
exports.FriendService = FriendService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcmllbmQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQyxzQ0FBd0Q7QUFHeEQsSUFBYSxhQUFhO0lBRXhCLHVCQUFvQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtJQUFJLENBQUM7SUFFbkMsaUNBQVMsR0FBVCxVQUFVLE1BQU07UUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUM7YUFDeEIsU0FBUyxDQUFDLFVBQUMsSUFBSTtZQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDbkIsQ0FBQyxFQUFFLFVBQUMsR0FBRztZQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDbEIsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsaUNBQVMsR0FBVCxVQUFVLE1BQU07UUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDekIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNO1lBQ3JCLFFBQVEsRUFBRSxNQUFNLENBQUMsUUFBUTtTQUMxQixDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQscUNBQWEsR0FBYixVQUFjLE1BQU07UUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBWSxNQUFNLENBQUMsRUFBSSxDQUFDLENBQUE7SUFDM0MsQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FBQyxBQXZCRCxJQXVCQztBQXZCWSxhQUFhO0lBRHpCLGlCQUFVLEVBQUU7cUNBR2UsV0FBSTtHQUZuQixhQUFhLENBdUJ6QjtBQXZCWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHAsIFJlc3BvbnNlLCBIZWFkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGcmllbmRTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHApIHsgfVxuXG4gIGdldEZyaWVuZChmcmllbmQpIHtcbiAgICB0aGlzLmh0dHAuZ2V0KCcvZnJpZW5kcycpXG4gICAgLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICB9LCAoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgfSlcbiAgfVxuXG4gIGFkZEZyaWVuZChmcmllbmQpIHtcbiAgICB0aGlzLmh0dHAucG9zdCgnL2ZyaWVuZHMnLCB7XG4gICAgICB1c2VySWQ6IGZyaWVuZC51c2VySWQsXG4gICAgICBmcmllbmRJZDogZnJpZW5kLmZyaWVuZElEXG4gICAgfSlcbiAgfVxuXG4gIGRlbGV0ZU1lc3NhZ2UoZnJpZW5kKSB7XG4gICAgdGhpcy5odHRwLmRlbGV0ZShgL2ZyaWVuZHMvJHtmcmllbmQuaWR9YClcbiAgfVxufVxuIl19