"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var CategoryService = (function () {
    function CategoryService(http) {
        this.http = http;
    }
    CategoryService.prototype.getCategory = function (category) {
        this.http.get('/categories')
            .subscribe(function (data) {
            console.log(data);
        }, function (err) {
            console.log(err);
        });
    };
    CategoryService.prototype.addCategory = function (category) {
        this.http.post('/category', {
            name: category.name
        })
            .subscribe(function (data) {
            console.log('added category', data);
        }, function (err) {
            console.log(err);
        });
    };
    CategoryService.prototype.deleteCategory = function (category) {
        this.http.delete("/categories/" + category.id);
    };
    return CategoryService;
}());
CategoryService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcnkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNhdGVnb3J5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0Msc0NBQXdEO0FBR3hELElBQWEsZUFBZTtJQUUxQix5QkFBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07SUFBSSxDQUFDO0lBRW5DLHFDQUFXLEdBQVgsVUFBWSxRQUFRO1FBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQzthQUMzQixTQUFTLENBQUMsVUFBQyxJQUFJO1lBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNuQixDQUFDLEVBQUUsVUFBQyxHQUFHO1lBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNsQixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxxQ0FBVyxHQUFYLFVBQVksUUFBUTtRQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDMUIsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJO1NBQ3BCLENBQUM7YUFDRCxTQUFTLENBQUMsVUFBQyxJQUFJO1lBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUNyQyxDQUFDLEVBQUUsVUFBQyxHQUFHO1lBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNsQixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCx3Q0FBYyxHQUFkLFVBQWUsUUFBUTtRQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBZSxRQUFRLENBQUMsRUFBSSxDQUFDLENBQUE7SUFDaEQsQ0FBQztJQUNILHNCQUFDO0FBQUQsQ0FBQyxBQTNCRCxJQTJCQztBQTNCWSxlQUFlO0lBRDNCLGlCQUFVLEVBQUU7cUNBR2UsV0FBSTtHQUZuQixlQUFlLENBMkIzQjtBQTNCWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHAsIFJlc3BvbnNlLCBIZWFkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDYXRlZ29yeVNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCkgeyB9XG5cbiAgZ2V0Q2F0ZWdvcnkoY2F0ZWdvcnkpIHtcbiAgICB0aGlzLmh0dHAuZ2V0KCcvY2F0ZWdvcmllcycpXG4gICAgLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgY29uc29sZS5sb2coZGF0YSlcbiAgICB9LCAoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgfSlcbiAgfVxuXG4gIGFkZENhdGVnb3J5KGNhdGVnb3J5KSB7XG4gICAgdGhpcy5odHRwLnBvc3QoJy9jYXRlZ29yeScsIHtcbiAgICAgIG5hbWU6IGNhdGVnb3J5Lm5hbWVcbiAgICB9KVxuICAgIC5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdhZGRlZCBjYXRlZ29yeScsIGRhdGEpXG4gICAgfSwgKGVycikgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgIH0pXG4gIH1cblxuICBkZWxldGVDYXRlZ29yeShjYXRlZ29yeSkge1xuICAgIHRoaXMuaHR0cC5kZWxldGUoYC9jYXRlZ29yaWVzLyR7Y2F0ZWdvcnkuaWR9YClcbiAgfVxufVxuIl19