# MLB Game Schedule and Score Viewer
This is an application that shows the MLB matches and finished scores for a given day. Click for [Demo](http://g.recordit.co/ZY6tdssJJ0.gif)
* Git Clone, npm i, npm run start, listen;

## Checklist: Requirements
### Scene 1 - List View
- [x] A list of baseball games is displayed for a given day, with home/away team names and scores + statuses, allows user to toggle between dates (next day, previous day) or select a day 
- [x] Because the Toronto Blue Jays is our favourite team, we want them to show up first in the list view every time
- [x] If there are no games on that date make sure to display a message ("No games today") 
- [x] Bold or highlight the winning team (team with more runs)
### Scene 2 - Detail View
- [x] Using the data from "{game_data_directory}/boxscore.json" populate a detail screen for the game when you click the game
- [x] The detail screen should display a linescore of the game (inning by inning)
- [x] It should also display a list of batters and stats for each team, and allow you to toggle between viewing either team's batters
- [x] When you're done viewing the details of the game, you should be able to go back to the list of games where you last left off

### Special Features of this Application ⚾️
*  Icon of each team available
*  .OPS score available
*  MLB Colors inspired from the MLB site itself
*  Team Total runs of season

### Challenges 💥
* A complicated API with many nested objects
* Figuring out routing and using Next.js as routing to navigate between games > game 
* Organizing the react components in a hierachical structure, making sure props and state were properly communicated from top down
* Using different libraries and making sure they were reliable/compatible with my code
* UI/UX: didn't know where to place the favoriting of team; whether to create a separate page (which seemed awkward), games page (crowded) and game page(doesn't make sense)
* using create-react-app's babel's preset as the Fetch promise was not accessible by some older browsers
* making sure to write clean code and break down into fns
* acccording to caniuse.com, fetch api are not supported by IE and Safari < 10. 3. Although a solution for safari has been implemented, ie standard is hard to satisfy. Thus, best for viewing in Chrome or Firefox

### TODO & Ideas
- [ ] Figure out the best UI.UX choice to implement "favorite team component"
- [ ] Put some highlight videos of the match in either games or game page
- [ ] Learn server-side rendering to reproduce cleaner URLS using Next & Express
- [ ] Adjust for different phone sizes ( while still uses flex, font sizes dont decrease )
- [ ] Learn more about baseball

### Libraries Used
* ReactJS
* NextJS
* react-date-picker
* react-image-fallback
* react-table
* Lodash
* Moment
* etc.




