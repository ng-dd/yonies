"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var PostService = (function () {
    function PostService(http) {
        this.http = http;
    }
    PostService.prototype.getPost = function (post) {
        this.http.get('/posts')
            .subscribe(function (data) {
            console.log(data);
        }, function (err) {
            console.log(err);
        });
    };
    PostService.prototype.addPost = function (post) {
        this.http.post('/posts', {
            url: post.url,
            postlike: post.postLikes,
            comment: post.comment,
            commentlike: post.commentLikes,
            parent: post.parent
        })
            .subscribe(function (data) {
            console.log(data);
        }, function (err) {
            console.log(err);
        });
    };
    PostService.prototype.deletePost = function (post) {
        this.http.delete("/post/" + post.id);
    };
    return PostService;
}());
PostService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicG9zdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLHNDQUF3RDtBQUd4RCxJQUFhLFdBQVc7SUFFdEIscUJBQW9CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO0lBQUksQ0FBQztJQUVuQyw2QkFBTyxHQUFQLFVBQVEsSUFBSTtRQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQzthQUN0QixTQUFTLENBQUMsVUFBQyxJQUFJO1lBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNuQixDQUFDLEVBQUUsVUFBQyxHQUFHO1lBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNsQixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCw2QkFBTyxHQUFQLFVBQVEsSUFBSTtRQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUN2QixHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7WUFDYixRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDeEIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLFdBQVcsRUFBRSxJQUFJLENBQUMsWUFBWTtZQUM5QixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07U0FDcEIsQ0FBQzthQUNELFNBQVMsQ0FBQyxVQUFDLElBQUk7WUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BCLENBQUMsRUFBRSxVQUFDLEdBQUc7WUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ2xCLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELGdDQUFVLEdBQVYsVUFBVyxJQUFJO1FBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBUyxJQUFJLENBQUMsRUFBSSxDQUFDLENBQUE7SUFDdEMsQ0FBQztJQUNILGtCQUFDO0FBQUQsQ0FBQyxBQS9CRCxJQStCQztBQS9CWSxXQUFXO0lBRHZCLGlCQUFVLEVBQUU7cUNBR2UsV0FBSTtHQUZuQixXQUFXLENBK0J2QjtBQS9CWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHAsIFJlc3BvbnNlLCBIZWFkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQb3N0U2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwKSB7IH1cblxuICBnZXRQb3N0KHBvc3QpIHtcbiAgICB0aGlzLmh0dHAuZ2V0KCcvcG9zdHMnKVxuICAgIC5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgfSwgKGVycikgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgIH0pXG4gIH1cblxuICBhZGRQb3N0KHBvc3QpIHtcbiAgICB0aGlzLmh0dHAucG9zdCgnL3Bvc3RzJywge1xuICAgICAgdXJsOiBwb3N0LnVybCxcbiAgICAgIHBvc3RsaWtlOiBwb3N0LnBvc3RMaWtlcyxcbiAgICAgIGNvbW1lbnQ6IHBvc3QuY29tbWVudCxcbiAgICAgIGNvbW1lbnRsaWtlOiBwb3N0LmNvbW1lbnRMaWtlcyxcbiAgICAgIHBhcmVudDogcG9zdC5wYXJlbnQgXG4gICAgfSlcbiAgICAuc3Vic2NyaWJlKChkYXRhKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICB9LCAoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgfSlcbiAgfVxuXG4gIGRlbGV0ZVBvc3QocG9zdCkge1xuICAgIHRoaXMuaHR0cC5kZWxldGUoYC9wb3N0LyR7cG9zdC5pZH1gKVxuICB9XG59XG4iXX0=