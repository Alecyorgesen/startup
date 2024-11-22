# Rock Paper Scissors Showdown

### Elevator pitch

The web application is just going to be a bit of fun. It will be rock, paper, scissors but with the twist that you need to choose rock, paper, or scissors in five different boxes, and then your opponents five go against your five. You have a few rounds of this until you either reach a certain number of wins. If you tie, you continue until one has more than the other.

## Design

![Picture representing a game idea.](/game_picture_idea.png)


## Key features

- People will be able to go to the webpage, and it will ask you to login or create a new user.
- After logging in, you will be able to either randomly join a game using websocket, or you can challenge a friend.
- You will be able to friend people, and start games specifically with them. The friend list will be stored in the database.
- The ability to select rock, paper, or scissors and confirm that they are ready.

## Technologies

- **HTML:** It will be used to structure the spot where you'll login as well as the structure of the game.
- **CSS:** It will be used to make everything look nice.
- **Javascript:** Allows the webpage to be interacted with so that you can choose your items that you will put up against your opponent.
- **React:** Basically will help do what javascript does, but in a more organized way.
- **Service:** It is what handles the logic. It will store stuff in the database, handle login, and handle the game.
- **Database/Login:** It will have the usernames, plus their login information and friend lists.
- **Websocket:** This will be used so that the game can be played in the first place. The clients will tell the server their choices, and it will tell them what their opponent chose.

## HTML

- [x] There are currently 4 html files included.
- [x] Created a login page!
- [x] play.html: This is where you will actually be able to play the game. Right now it just has buttons. I'll probably switch it out for drop down menus.
- [x] scores.html: This is here to see who has the most wins. Eventually it will pull information from a database.
- [x] about.html: This is here so that you can learn more about the game.
- [ ] I want to replace the buttons with dropdown menus, but I'll have to do that later with Bootstrap.
- [x] Added placeholder image from another website. The idea is it's from database that's not mine.

## CSS
- [x] Login page: It's pretty good! Nothing too extravagant here.
- [ ] Play page: There are still things that I think that I should change, and I know that there are things that I should add, but I'll get to those things later as I actually make the game functional.
- [x] Scores page: I'm just using the default bootstrap table here. Nothing crazy going on.
- [x] About page: I managed to get things centered. I'll later make it so that random pictures show up from some other website I think.

## React
- [x] Convert everything to react!
- [x] Make a mock version of the login and create new account functionality!
- [ ] Make a mock version of the game!!!! Play against a bot maybe? I partially did this. You can't play yet, but you can select the different options that are available.

## Services
- [x] Create end points
- [x] Use the end poins
- [x] Make a call to a different website

