# Hash Hunt

## Challenge Name
**Hash Hunt**

## Description
The participant lands on a login page. At first glance, nothing special. But inspecting the JavaScript reveals a hash — though not directly. Instead, it's split into two parts and then concatenated, like this:

```javascript
const part1 = "5f4dcc3b5aa76";
const part2 = "5d61d8327deb882cf99";
const correctHash = part1 + part2;
```

This full string is the MD5 hash of the real password. The player must figure out what the password is, then use it to log in and retrieve the flag.

## Category
**Web Exploitation**

## Difficulty
**Medium**

## By
**Shlok Garg**

## Steps to Solve

1. **Initial Reconnaissance**: Open the login page and attempt a few login attempts to understand the behavior.

2. **Developer Tools Investigation**: Open Developer Tools (F12) → Navigate to Sources or Elements tab.

3. **Code Analysis**: Find the suspicious JavaScript code where the hash is split into two strings:
   - Locate `part1 = "5f4dcc3b5aa76"`
   - Locate `part2 = "5d61d8327deb882cf99"`

4. **Hash Reconstruction**: Concatenate the two parts mentally or by copy-pasting:
   - Result: `5f4dcc3b5aa765d61d8327deb882cf99`

5. **Hash Recognition**: Recognize the 32-character hexadecimal string as an MD5 hash.

6. **Hash Cracking**: Use Google or an MD5 lookup service to reverse the hash:
   - Search: `5f4dcc3b5aa765d61d8327deb882cf99`
   - Discover it's the MD5 hash of `"password"`

7. **Authentication**: Enter the discovered password (username is pre-filled as "admin").

8. **Flag Retrieval**: Successfully log in to get redirected to the flag page containing `cbc{you_cracked_the_hash}`.

## Flag Format
```
cbc{you_cracked_the_hash}
```

## How to Set Up

### Prerequisites
- Basic web server (Apache, Nginx, or Python HTTP server)
- Modern web browser with developer tools

### Setup Instructions

1. **Create Project Structure**:
   ```
   hash-hunt/
   ├── index.html          # Main login page
   ├── style.css           # Styling
   ├── script.js          # JavaScript with split hash
   └── flag.html          # Hidden flag page
   ```

2. **Deploy the Web Application**:
   - Place all files in your web server's document root
   - Ensure the web server can serve static files
   - Test accessibility via browser

3. **Alternative Local Setup**:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   ```

4. **Verification**:
   - Navigate to the login page
   - Inspect the JavaScript source
   - Verify the hash split is visible in developer tools
   - Test login with correct credentials

### Technical Implementation Details

The JavaScript validation should:
- Store the MD5 hash split into `part1` and `part2`
- Concatenate parts for comparison during login
- Redirect to flag page upon successful authentication
- Handle failed login attempts gracefully

### Security Considerations
- This challenge intentionally exposes credentials in client-side code for educational purposes
- In production, never store passwords or hashes in client-side JavaScript
- Consider adding rate limiting for repeated failed attempts

## Hints

1. **Visual Clue**: "Sometimes secrets aren't shown directly, but in pieces."
   - *Guidance*: Look for split or fragmented data in the source code.

2. **Recognition Hint**: "Google can recognize common hashes."
   - *Guidance*: Try searching the complete hash string online.

3. **Technical Hint**: "MD5 strings are usually 32 hex characters long."
   - *Guidance*: Look for strings that match this pattern when concatenated.

4. **Investigation Hint**: "The answer might be hiding in plain sight, just not all together."
   - *Guidance*: Check the JavaScript source code thoroughly.

5. **Credential Hint**: "The username is provided for you."
   - *Guidance*: Focus on finding the password, not the username.

## Learning Objectives

- **Client-Side Security**: Understanding the dangers of storing sensitive information in client-side code
- **Hash Recognition**: Learning to identify common hash formats and their characteristics
- **Developer Tools**: Practicing web application analysis using browser developer tools
- **Hash Cracking**: Introduction to hash reversal techniques and rainbow tables
- **Source Code Analysis**: Developing skills to analyze JavaScript for security vulnerabilities

## Additional Notes

- **Difficulty Justification**: Marked as "Medium" because it requires:
  - Knowledge of developer tools
  - Understanding of hash formats
  - Ability to piece together split information
  - Basic cryptographic knowledge

- **Real-World Relevance**: This challenge demonstrates a common security mistake where sensitive data is exposed in client-side code, making it easily discoverable by attackers.

- **Educational Value**: Teaches participants about proper security practices and the importance of server-side validation.