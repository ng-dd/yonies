"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var LikesService = (function () {
    function LikesService(http) {
        this.http = http;
    }
    LikesService.prototype.getLikes = function (like) {
        this.http.get('/likes')
            .subscribe(function (data) {
            console.log(data);
        }, function (err) {
            console.log(err);
        });
    };
    LikesService.prototype.addPost = function (like) {
        this.http.post('/likes', {
            userId: like.userId,
            postId: like.postId
        });
    };
    LikesService.prototype.deleteLike = function (like) {
        this.http.delete("/likes/" + like.id);
    };
    return LikesService;
}());
LikesService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], LikesService);
exports.LikesService = LikesService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlrZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxpa2VzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0Msc0NBQXdEO0FBR3hELElBQWEsWUFBWTtJQUV2QixzQkFBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07SUFBSSxDQUFDO0lBRWpDLCtCQUFRLEdBQVIsVUFBUyxJQUFJO1FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDO2FBQ3RCLFNBQVMsQ0FBQyxVQUFDLElBQUk7WUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ25CLENBQUMsRUFBRSxVQUFDLEdBQUc7WUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ2xCLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELDhCQUFPLEdBQVAsVUFBUSxJQUFJO1FBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ3ZCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07U0FDcEIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELGlDQUFVLEdBQVYsVUFBVyxJQUFJO1FBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBVSxJQUFJLENBQUMsRUFBSSxDQUFDLENBQUE7SUFDdkMsQ0FBQztJQUNMLG1CQUFDO0FBQUQsQ0FBQyxBQXZCRCxJQXVCQztBQXZCWSxZQUFZO0lBRHhCLGlCQUFVLEVBQUU7cUNBR2UsV0FBSTtHQUZuQixZQUFZLENBdUJ4QjtBQXZCWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHAsIFJlc3BvbnNlLCBIZWFkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMaWtlc1NlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCkgeyB9XG5cbiAgICBnZXRMaWtlcyhsaWtlKSB7XG4gICAgICB0aGlzLmh0dHAuZ2V0KCcvbGlrZXMnKVxuICAgICAgLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgfSwgKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICB9KVxuICAgIH1cblxuICAgIGFkZFBvc3QobGlrZSkge1xuICAgICAgdGhpcy5odHRwLnBvc3QoJy9saWtlcycsIHtcbiAgICAgICAgdXNlcklkOiBsaWtlLnVzZXJJZCxcbiAgICAgICAgcG9zdElkOiBsaWtlLnBvc3RJZFxuICAgICAgfSlcbiAgICB9XG5cbiAgICBkZWxldGVMaWtlKGxpa2UpIHtcbiAgICAgIHRoaXMuaHR0cC5kZWxldGUoYC9saWtlcy8ke2xpa2UuaWR9YClcbiAgICB9XG59XG4iXX0=