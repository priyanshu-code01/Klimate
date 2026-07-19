let str = 'My name is Priyanshu singh'

let longest = str.split(' ').reduce((longestWord, currentWord) => {
    if (currentWord.length > longestWord.length) {
        return currentWord
    } else {
        return longestWord
    }
}
)

console.log(longest)