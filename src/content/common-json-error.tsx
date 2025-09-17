const commonErrorMarkdown = `

# 5 Common JSON Errors and How to Fix Them Fast

JSON (JavaScript Object Notation) is the de facto standard for data interchange on the web. It's lightweight, human-readable, and easy for machines to parse. However, it's also incredibly strict. A single misplaced comma or quote can render an entire file invalid.

Whether you're a seasoned developer or just starting out, you've likely run into a frustrating JSON parsing error. Here are five of the most common mistakes and how to quickly fix them.

---

## 1. The Trailing Comma

This is arguably the most frequent JSON error. It happens when you add a comma after the last element in an object or array. While modern JavaScript allows this, the JSON specification does not.

**❌ Wrong:**
\`\`\`json
{
  "name": "John Doe",
  "isAdmin": true,
  "roles": [
    "editor",
    "contributor",
  ]
}
\`\`\`

✅ Correct:
\`\`\`json

{
  "name": "John Doe",
  "isAdmin": true,
  "roles": [
    "editor",
    "contributor"
  ]
}
\`\`\`

The Fix: Simply remove the comma from the last item ("contributor", -> "contributor"). Always double-check the final element in any list or set of key-value pairs.

## 2. Using Single Quotes Instead of Double Quotes

Many programming languages are flexible with string delimiters, accepting both single (') and double (") quotes. JSON is not flexible. It mandates that all keys and all string values must be enclosed in double quotes.

❌ Wrong:
\`\`\`JSON

{
  'name': 'Jane Doe',
  'city': 'New York'
}
\`\`\`

✅ Correct:
\`\`\`JSON

{
  "name": "Jane Doe",
  "city": "New York"
}
\`\`\`

The Fix: Do a find-and-replace for single quotes (') and change them to double quotes (") for all keys and string values.

## 3. Unquoted Keys

This is another mistake that often comes from experience with JavaScript objects, where keys don't always need to be quoted. In JSON, all keys must be strings enclosed in double quotes.

❌ Wrong:
\`\`\`JSON

{
  name: "Peter Jones",
  isVerified: false
}
\`\`\`

✅ Correct:
\`\`\`JSON

{
  "name": "Peter Jones",
  "isVerified": false
}
\`\`\`

The Fix: Ensure every key on the left side of the colon (:) is wrapped in double quotes.

## 4. Missing Commas Between Elements

Just as a trailing comma is an error, a missing comma is, too. Every element in an array and every key-value pair in an object must be separated by a comma (except for the last one).

❌ Wrong:
\`\`\`JSON

{
  "protocol": "https"
  "host": "example.com"
}
\`\`\`

✅ Correct:
\`\`\`JSON

{
  "protocol": "https",
  "host": "example.com"
}
\`\`\`

The Fix: Scan your file and make sure there's a comma separating each line within an object or array.

## 5. Mismatched Brackets or Braces

A simple typo can leave you with an unclosed object ({) or array ([). This often happens in deeply nested structures and can be hard to spot manually.

❌ Wrong:
\`\`\`JSON

{
  "user": {
    "id": 123,
    "name": "Alice"
  ,
  "posts": [
    {"id": 1, "title": "First post"},
    {"id": 2, "title": "Second post"}
  ]
}
\`\`\`
(Notice the unclosed user object brace)

✅ Correct:
\`\`\`JSON

{
  "user": {
    "id": 123,
    "name": "Alice"
  },
  "posts": [
    {"id": 1, "title": "First post"},
    {"id": 2, "title": "Second post"}
  ]
}
\`\`\`
The Fix: Use a code editor with syntax highlighting and bracket matching. Most editors will highlight matching pairs ({...} or [...]), making it easy to see where one is missing.

## Bonus Tip: Use a Validator!

The fastest way to catch any JSON error is to use a linter in your code editor (like ESLint) or paste your code into a reliable online JSON validator. These tools will instantly parse your JSON and point you to the exact line where the error occurred.

By keeping these common pitfalls in mind, you'll spend less time debugging syntax and more time building great applications.

`;

export default commonErrorMarkdown;
