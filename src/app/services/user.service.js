"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var UserService = (function () {
    function UserService(http) {
        this.http = http;
    }
    UserService.prototype.getUser = function (user) {
        this.http.get("/users/" + user.id)
            .subscribe(function (data) {
            console.log(data);
        }, function (err) {
            console.log(err);
        });
    };
    UserService.prototype.addUser = function (user) {
        this.http.post('http://localhost:4201/users', {
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            adminstatus: user.adminstatus,
            age: user.age,
            gender: user.gender,
            address: user.address,
            city: user.city,
            state: user.state,
            zipcode: user.zipcode,
            email: user.email,
            phone: user.phone
        })
            .subscribe(function (data) {
            console.log('added user to db', data);
        }, function (err) {
            console.log(err);
        });
    };
    UserService.prototype.deleteUser = function (user) {
        this.http.delete("/users/" + user.id);
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLHNDQUF3RDtBQUd4RCxJQUFhLFdBQVc7SUFFdEIscUJBQW9CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO0lBQUksQ0FBQztJQUVuQyw2QkFBTyxHQUFQLFVBQVEsSUFBSTtRQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVUsSUFBSSxDQUFDLEVBQUksQ0FBQzthQUNqQyxTQUFTLENBQUMsVUFBQyxJQUFJO1lBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNuQixDQUFDLEVBQUUsVUFBQyxHQUFHO1lBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNsQixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCw2QkFBTyxHQUFQLFVBQVEsSUFBSTtRQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLDZCQUE2QixFQUFFO1lBQzVDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDekIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztZQUM3QixHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7WUFDYixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDbkIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztTQUNsQixDQUFDO2FBQ0QsU0FBUyxDQUFDLFVBQUMsSUFBSTtZQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDdkMsQ0FBQyxFQUFFLFVBQUMsR0FBRztZQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDbEIsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsZ0NBQVUsR0FBVixVQUFXLElBQUk7UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFVLElBQUksQ0FBQyxFQUFJLENBQUMsQ0FBQTtJQUN2QyxDQUFDO0lBQ0gsa0JBQUM7QUFBRCxDQUFDLEFBdENELElBc0NDO0FBdENZLFdBQVc7SUFEdkIsaUJBQVUsRUFBRTtxQ0FHZSxXQUFJO0dBRm5CLFdBQVcsQ0FzQ3ZCO0FBdENZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cCwgUmVzcG9uc2UsIEhlYWRlcnMgfSBmcm9tICdAYW5ndWxhci9odHRwJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFVzZXJTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHApIHsgfVxuICBcbiAgZ2V0VXNlcih1c2VyKSB7XG4gICAgdGhpcy5odHRwLmdldChgL3VzZXJzLyR7dXNlci5pZH1gKVxuICAgIC5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgfSwgKGVycikgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgIH0pXG4gIH1cblxuICBhZGRVc2VyKHVzZXIpIHtcbiAgICB0aGlzLmh0dHAucG9zdCgnaHR0cDovL2xvY2FsaG9zdDo0MjAxL3VzZXJzJywge1xuICAgICAgdXNlcm5hbWU6IHVzZXIudXNlcm5hbWUsXG4gICAgICBmaXJzdG5hbWU6IHVzZXIuZmlyc3RuYW1lLFxuICAgICAgbGFzdG5hbWU6IHVzZXIubGFzdG5hbWUsXG4gICAgICBhZG1pbnN0YXR1czogdXNlci5hZG1pbnN0YXR1cyxcbiAgICAgIGFnZTogdXNlci5hZ2UsXG4gICAgICBnZW5kZXI6IHVzZXIuZ2VuZGVyLFxuICAgICAgYWRkcmVzczogdXNlci5hZGRyZXNzLFxuICAgICAgY2l0eTogdXNlci5jaXR5LFxuICAgICAgc3RhdGU6IHVzZXIuc3RhdGUsXG4gICAgICB6aXBjb2RlOiB1c2VyLnppcGNvZGUsXG4gICAgICBlbWFpbDogdXNlci5lbWFpbCxcbiAgICAgIHBob25lOiB1c2VyLnBob25lXG4gICAgfSlcbiAgICAuc3Vic2NyaWJlKChkYXRhKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnYWRkZWQgdXNlciB0byBkYicsIGRhdGEpXG4gICAgfSwgKGVycikgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgIH0pXG4gIH1cblxuICBkZWxldGVVc2VyKHVzZXIpIHtcbiAgICB0aGlzLmh0dHAuZGVsZXRlKGAvdXNlcnMvJHt1c2VyLmlkfWApXG4gIH1cbn1cbiJdfQ==