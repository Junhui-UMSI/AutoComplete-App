# AutoComplete-App
## Implements
Before clonning this repository, make sure the machine have [gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) installed
After clonning this git repository, simply direct to the local folder and type the following command
```javascript
npm install
gulp serve
```
You should see this after the app is successfully runned
![download](app/images/1.png)

## Folder Structure
I'm using gulp to serve this application locally, therefore there are two folders in this app. The app folder is where the source file located. While the Build folder is where the distribution files located

## Thinking Process of the app
The main idea for this app is simple, I choose the Trie for searching, whenever user input some value, it will go thorugh the hanndleChange and set different value for the output state. I want this application to be straight forward, clean and easy to grow bigger. Some of the main ideas are as follows.

1. I choose Gulp to serve this app because i could see the change automatically without refreshing the web page. And it is clear to see where I went wrong in the terminal when an error is occured.
2. The application is mainly for searching through the city list and return results. The first thing to consider is the searching. Trie is the ideal data structure for searching, especailly when the data set is large. Therefore the first thing to do is writing the Trie structure and some prototype methods like put() and getall(). put() is for creating the Trie based on the list, getall() is for search for all the name that match the input in Trie.
3. The second part is for writing the component. I split the codes into three components, the trie, searchbox and dataEndpoint. It would be much clearer to see the logic of the application and it would be easier to add new features or change the data set without going deep into the codes.
4. When writing the js file, I paid attention to decrease the use of State and minimize the re-render times. Because these little things coule help to organize the code, causing less confusion when someone else is reading it. And it could save some page loading time. 
