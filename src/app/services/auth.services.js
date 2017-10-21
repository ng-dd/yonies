"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var auth_1 = require("angularfire2/auth");
var firebase = require("firebase/app");
var AuthService = (function () {
    function AuthService(firebaseAuth) {
        this.firebaseAuth = firebaseAuth;
        this.user = firebaseAuth.authState;
    }
    AuthService.prototype.confirmEmail = function () {
        var user = firebase.auth().currentUser;
        user.sendEmailVerification()
            .then(function () { console.log('email send'); })
            .catch(function (err) { console.log(err, 'error'); });
    };
    AuthService.prototype.resetPassword = function (email) {
        var auth = firebase.auth();
        return auth.sendPasswordResetEmail(email)
            .then(function () {
            console.log('email sent');
        })
            .catch(function (err) {
            console.log(err, 'couldnt send email');
        });
    };
    AuthService.prototype.signup = function (email, password, firstname, lastname) {
        var _this = this;
        this.firebaseAuth
            .auth
            .createUserWithEmailAndPassword(email, password)
            .then(function (value) {
            console.log('Success!', value, value.uid);
            _this.confirmEmail();
        })
            .catch(function (err) {
            console.log('Something went wrong:', err.message);
        });
    };
    AuthService.prototype.facebookLogin = function () {
        firebase.auth()
            .signInWithRedirect(new firebase.auth.FacebookAuthProvider)
            .then(function (res) {
            console.log(res);
        });
    };
    AuthService.prototype.googleLogin = function () {
        this.firebaseAuth.auth
            .signInWithPopup(new firebase.auth.GoogleAuthProvider)
            .then(function (res) {
            console.log(res);
        });
    };
    AuthService.prototype.twitterLogin = function () {
        this.firebaseAuth.auth
            .signInWithPopup(new firebase.auth.TwitterAuthProvider)
            .then(function (res) {
            console.log(res);
        });
    };
    AuthService.prototype.login = function (email, password) {
        this.firebaseAuth
            .auth
            .signInWithEmailAndPassword(email, password)
            .then(function (value) {
            console.log('Nice, it worked!');
        })
            .catch(function (err) {
            console.log('Something went wrong:', err.message);
        });
    };
    AuthService.prototype.logout = function () {
        this.firebaseAuth
            .auth
            .signOut();
    };
    return AuthService;
}());
AuthService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [auth_1.AngularFireAuth])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF1dGguc2VydmljZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFFM0MsMENBQW9EO0FBQ3BELHVDQUF5QztBQUl6QyxJQUFhLFdBQVc7SUFJdEIscUJBQ1UsWUFBNkI7UUFBN0IsaUJBQVksR0FBWixZQUFZLENBQWlCO1FBRXJDLElBQUksQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsa0NBQVksR0FBWjtRQUNFLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUM7UUFFdkMsSUFBSSxDQUFDLHFCQUFxQixFQUFFO2FBQ3pCLElBQUksQ0FBQyxjQUFRLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUM7YUFDekMsS0FBSyxDQUFDLFVBQUMsR0FBRyxJQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDbEQsQ0FBQztJQUVELG1DQUFhLEdBQWIsVUFBYyxLQUFhO1FBQ3pCLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMzQixNQUFNLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQzthQUN0QyxJQUFJLENBQUM7WUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFBO1FBQzNCLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFDLEdBQUc7WUFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxvQkFBb0IsQ0FBQyxDQUFBO1FBQ3hDLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELDRCQUFNLEdBQU4sVUFBTyxLQUFhLEVBQUUsUUFBZ0IsRUFBRSxTQUFpQixFQUFFLFFBQWdCO1FBQTNFLGlCQVlDO1FBWEMsSUFBSSxDQUFDLFlBQVk7YUFDZCxJQUFJO2FBQ0osOEJBQThCLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQzthQUMvQyxJQUFJLENBQUMsVUFBQSxLQUFLO1lBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQyxLQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdEIsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUEsR0FBRztZQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BELENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUVELG1DQUFhLEdBQWI7UUFDRSxRQUFRLENBQUMsSUFBSSxFQUFFO2FBQ1osa0JBQWtCLENBQUMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDO2FBQzFELElBQUksQ0FBQyxVQUFBLEdBQUc7WUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELGlDQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUk7YUFDbkIsZUFBZSxDQUFDLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQzthQUNyRCxJQUFJLENBQUMsVUFBQSxHQUFHO1lBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxrQ0FBWSxHQUFaO1FBQ0UsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJO2FBQ25CLGVBQWUsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUM7YUFDdEQsSUFBSSxDQUFDLFVBQUEsR0FBRztZQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDbEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsMkJBQUssR0FBTCxVQUFNLEtBQWEsRUFBRSxRQUFnQjtRQUNuQyxJQUFJLENBQUMsWUFBWTthQUNkLElBQUk7YUFDSiwwQkFBMEIsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDO2FBQzNDLElBQUksQ0FBQyxVQUFBLEtBQUs7WUFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDbEMsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUEsR0FBRztZQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDRCQUFNLEdBQU47UUFDRSxJQUFJLENBQUMsWUFBWTthQUNkLElBQUk7YUFDSixPQUFPLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFFSCxrQkFBQztBQUFELENBQUMsQUFyRkQsSUFxRkM7QUFyRlksV0FBVztJQUR2QixpQkFBVSxFQUFFO3FDQU1hLHNCQUFlO0dBTDVCLFdBQVcsQ0FxRnZCO0FBckZZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBBbmd1bGFyRmlyZUF1dGggfSBmcm9tICdhbmd1bGFyZmlyZTIvYXV0aCc7XG5pbXBvcnQgKiBhcyBmaXJlYmFzZSBmcm9tICdmaXJlYmFzZS9hcHAnO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdXRoU2VydmljZSB7XG4gIHVzZXI6IE9ic2VydmFibGU8ZmlyZWJhc2UuVXNlcj47XG4gIHVzZXJLZXk6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGZpcmViYXNlQXV0aDogQW5ndWxhckZpcmVBdXRoLFxuICApIHtcbiAgICB0aGlzLnVzZXIgPSBmaXJlYmFzZUF1dGguYXV0aFN0YXRlO1xuICB9XG5cbiAgY29uZmlybUVtYWlsKCkge1xuICAgIGxldCB1c2VyID0gZmlyZWJhc2UuYXV0aCgpLmN1cnJlbnRVc2VyO1xuXG4gICAgdXNlci5zZW5kRW1haWxWZXJpZmljYXRpb24oKVxuICAgICAgLnRoZW4oKCkgPT4geyBjb25zb2xlLmxvZygnZW1haWwgc2VuZCcpIH0pXG4gICAgICAuY2F0Y2goKGVycikgPT4geyBjb25zb2xlLmxvZyhlcnIsICdlcnJvcicpIH0pXG4gIH1cblxuICByZXNldFBhc3N3b3JkKGVtYWlsOiBzdHJpbmcpIHtcbiAgICBsZXQgYXV0aCA9IGZpcmViYXNlLmF1dGgoKTtcbiAgICByZXR1cm4gYXV0aC5zZW5kUGFzc3dvcmRSZXNldEVtYWlsKGVtYWlsKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnZW1haWwgc2VudCcpXG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyLCAnY291bGRudCBzZW5kIGVtYWlsJylcbiAgICAgIH0pXG4gIH1cblxuICBzaWdudXAoZW1haWw6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZywgZmlyc3RuYW1lOiBzdHJpbmcsIGxhc3RuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLmZpcmViYXNlQXV0aFxuICAgICAgLmF1dGhcbiAgICAgIC5jcmVhdGVVc2VyV2l0aEVtYWlsQW5kUGFzc3dvcmQoZW1haWwsIHBhc3N3b3JkKVxuICAgICAgLnRoZW4odmFsdWUgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnU3VjY2VzcyEnLCB2YWx1ZSwgdmFsdWUudWlkKTtcbiAgICAgICAgdGhpcy5jb25maXJtRW1haWwoKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ1NvbWV0aGluZyB3ZW50IHdyb25nOicsIGVyci5tZXNzYWdlKTtcbiAgICAgIH0pO1xuXG4gIH1cblxuICBmYWNlYm9va0xvZ2luKCkge1xuICAgIGZpcmViYXNlLmF1dGgoKVxuICAgICAgLnNpZ25JbldpdGhSZWRpcmVjdChuZXcgZmlyZWJhc2UuYXV0aC5GYWNlYm9va0F1dGhQcm92aWRlcilcbiAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICB9KTtcbiAgfVxuXG4gIGdvb2dsZUxvZ2luKCkge1xuICAgIHRoaXMuZmlyZWJhc2VBdXRoLmF1dGhcbiAgICAgIC5zaWduSW5XaXRoUG9wdXAobmV3IGZpcmViYXNlLmF1dGguR29vZ2xlQXV0aFByb3ZpZGVyKVxuICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgdHdpdHRlckxvZ2luKCk6IHZvaWQge1xuICAgIHRoaXMuZmlyZWJhc2VBdXRoLmF1dGhcbiAgICAgIC5zaWduSW5XaXRoUG9wdXAobmV3IGZpcmViYXNlLmF1dGguVHdpdHRlckF1dGhQcm92aWRlcilcbiAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgIH0pO1xuICB9XG5cbiAgbG9naW4oZW1haWw6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZykge1xuICAgIHRoaXMuZmlyZWJhc2VBdXRoXG4gICAgICAuYXV0aFxuICAgICAgLnNpZ25JbldpdGhFbWFpbEFuZFBhc3N3b3JkKGVtYWlsLCBwYXNzd29yZClcbiAgICAgIC50aGVuKHZhbHVlID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ05pY2UsIGl0IHdvcmtlZCEnKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ1NvbWV0aGluZyB3ZW50IHdyb25nOicsIGVyci5tZXNzYWdlKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgbG9nb3V0KCkge1xuICAgIHRoaXMuZmlyZWJhc2VBdXRoXG4gICAgICAuYXV0aFxuICAgICAgLnNpZ25PdXQoKTtcbiAgfVxuXG59Il19