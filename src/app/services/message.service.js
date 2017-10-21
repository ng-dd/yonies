"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var MessageService = (function () {
    function MessageService(http) {
        this.http = http;
    }
    MessageService.prototype.getMessage = function (message) {
        this.http.get('/messages')
            .subscribe(function (data) {
            console.log(data);
        }, function (err) {
            console.log(err);
        });
    };
    MessageService.prototype.addMessage = function (message) {
        this.http.post('/messages', {
            videoDm: message.videoDm,
            message: message.message,
            userId: message.userId,
            friendId: message.friendId
        });
    };
    MessageService.prototype.deleteMessage = function (message) {
        this.http.delete("/messages/" + message.id);
    };
    return MessageService;
}());
MessageService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], MessageService);
exports.MessageService = MessageService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWVzc2FnZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLHNDQUF3RDtBQUd4RCxJQUFhLGNBQWM7SUFFekIsd0JBQW9CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO0lBQUksQ0FBQztJQUVuQyxtQ0FBVSxHQUFWLFVBQVcsT0FBTztRQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUM7YUFDekIsU0FBUyxDQUFDLFVBQUMsSUFBSTtZQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDbkIsQ0FBQyxFQUFFLFVBQUMsR0FBRztZQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDbEIsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsbUNBQVUsR0FBVixVQUFXLE9BQU87UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQzFCLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTztZQUN4QixPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU87WUFDeEIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNO1lBQ3RCLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUTtTQUMzQixDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsc0NBQWEsR0FBYixVQUFjLE9BQU87UUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBYSxPQUFPLENBQUMsRUFBSSxDQUFDLENBQUE7SUFDN0MsQ0FBQztJQUNILHFCQUFDO0FBQUQsQ0FBQyxBQXpCRCxJQXlCQztBQXpCWSxjQUFjO0lBRDFCLGlCQUFVLEVBQUU7cUNBR2UsV0FBSTtHQUZuQixjQUFjLENBeUIxQjtBQXpCWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHAsIFJlc3BvbnNlLCBIZWFkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNZXNzYWdlU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwKSB7IH1cbiAgXG4gIGdldE1lc3NhZ2UobWVzc2FnZSkge1xuICAgIHRoaXMuaHR0cC5nZXQoJy9tZXNzYWdlcycpXG4gICAgLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICB9LCAoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgfSlcbiAgfVxuXG4gIGFkZE1lc3NhZ2UobWVzc2FnZSkge1xuICAgIHRoaXMuaHR0cC5wb3N0KCcvbWVzc2FnZXMnLCB7XG4gICAgICB2aWRlb0RtOiBtZXNzYWdlLnZpZGVvRG0sXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlLm1lc3NhZ2UsXG4gICAgICB1c2VySWQ6IG1lc3NhZ2UudXNlcklkLFxuICAgICAgZnJpZW5kSWQ6IG1lc3NhZ2UuZnJpZW5kSWRcbiAgICB9KVxuICB9XG5cbiAgZGVsZXRlTWVzc2FnZShtZXNzYWdlKSB7XG4gICAgdGhpcy5odHRwLmRlbGV0ZShgL21lc3NhZ2VzLyR7bWVzc2FnZS5pZH1gKVxuICB9XG59XG4iXX0=