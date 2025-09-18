# Hash Hunt CTF Challenge - Setup Instructions

## Quick Start

### Option 1: Python HTTP Server (Recommended)
```bash
# Navigate to the challenge directory
cd hash-hunt

# Start the server (Python 3)
python -m http.server 8000

# Or for Python 2
python -m SimpleHTTPServer 8000

# Access the challenge at:
# http://localhost:8000
```

### Option 2: Node.js HTTP Server
```bash
# Install http-server globally (if not already installed)
npm install -g http-server

# Navigate to the challenge directory
cd hash-hunt

# Start the server
http-server -p 8000

# Access the challenge at:
# http://localhost:8000
```

### Option 3: PHP Built-in Server
```bash
# Navigate to the challenge directory
cd hash-hunt

# Start PHP server
php -S localhost:8000

# Access the challenge at:
# http://localhost:8000
```

## File Structure
```
hash-hunt/
├── index.html          # Main login page
├── style.css           # Styling for the application
├── script.js          # JavaScript with split hash vulnerability
├── flag.html          # Success page with flag
└── README.md          # This setup file
```

## Challenge Credentials

### Correct Login Information:
- **Username**: `admin`
- **Password**: `password`
- **Flag**: `cbc{you_cracked_the_hash}`

### Technical Details:
- **MD5 Hash**: `5f4dcc3b5aa765d61d8327deb882cf99`
- **Split Parts**:
  - `part1`: `"5f4dcc3b5aa76"`
  - `part2`: `"5d61d8327deb882cf99"`

## Testing the Challenge

### 1. Access the Login Page
- Open your browser and navigate to `http://localhost:8000`
- You should see the SecureVault login portal

### 2. Initial Failed Attempts
- Try logging in with random credentials to simulate realistic behavior
- Observe error messages and attempt counter

### 3. Inspect JavaScript Source
- Open Developer Tools (F12)
- Navigate to Sources tab
- Open `script.js`
- Look for the split hash components:
  ```javascript
  const part1 = "5f4dcc3b5aa76";
  const part2 = "5d61d8327deb882cf99";
  const correctHash = part1 + part2;
  ```

### 4. Solve the Challenge
- Concatenate the hash parts: `5f4dcc3b5aa765d61d8327deb882cf99`
- Use an online MD5 lookup to find it equals "password"
- Log in with username `admin` and password `password`
- Retrieve the flag: `cbc{you_cracked_the_hash}`

## Advanced Setup Options

### Docker Deployment
Create a `Dockerfile`:
```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
```

Build and run:
```bash
docker build -t hash-hunt .
docker run -p 8080:80 hash-hunt
```

### Apache/Nginx Configuration
For production deployment, configure your web server to serve the static files from the `hash-hunt` directory.

Example Nginx configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        root /path/to/hash-hunt;
        index index.html;
    }
}
```

## Security Considerations

### For Challenge Administrators:
1. **Isolation**: Run the challenge in an isolated environment
2. **Monitoring**: Log access attempts for analysis
3. **Rate Limiting**: Consider implementing rate limiting for repeated attempts
4. **HTTPS**: Use HTTPS in production environments

### Educational Notes:
- This challenge intentionally exposes credentials in client-side code
- In real applications, never store sensitive data in JavaScript
- Always implement server-side authentication and validation

## Troubleshooting

### Common Issues:

1. **Server Not Starting**:
   - Ensure the port (8000) is not already in use
   - Try a different port: `python -m http.server 8080`

2. **Page Not Loading**:
   - Check that all files are in the same directory
   - Verify file permissions are correct
   - Clear browser cache

3. **JavaScript Errors**:
   - Open browser console to check for errors
   - Ensure all files are properly linked
   - Check file paths in HTML

4. **Login Not Working**:
   - Verify credentials: username `admin`, password `password`
   - Check browser console for JavaScript errors
   - Clear browser storage (localStorage/sessionStorage)

### Browser Compatibility:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 15+

## Challenge Validation

### Automated Testing Script (Optional)
Create a simple test script to validate the challenge:

```python
#!/usr/bin/env python3
import requests
import re

def test_challenge():
    base_url = "http://localhost:8000"
    
    # Test 1: Login page loads
    response = requests.get(base_url)
    assert response.status_code == 200
    assert "SecureVault" in response.text
    
    # Test 2: JavaScript contains split hash
    js_response = requests.get(f"{base_url}/script.js")
    assert "5f4dcc3b5aa76" in js_response.text
    assert "5d61d8327deb882cf99" in js_response.text
    
    print("✅ Challenge validation successful!")

if __name__ == "__main__":
    test_challenge()
```

## Performance Notes

- **File Size**: Total challenge size ~15KB
- **Load Time**: <1 second on local server
- **Memory Usage**: Minimal (static files)
- **Concurrent Users**: Limited by web server configuration

## Customization Options

### Modify Difficulty:
1. **Easier**: Make hash visible in HTML comments
2. **Harder**: Obfuscate JavaScript further or use different encoding

### Change Credentials:
1. Generate new MD5 hash for different password
2. Update `script.js` with new hash parts
3. Update documentation accordingly

### Branding:
1. Modify `style.css` for different visual theme
2. Update company name and logos in HTML
3. Customize error messages and UI text

## Support and Resources

### MD5 Hash Resources:
- [MD5 Hash Generator](https://www.md5hashgenerator.com/)
- [MD5 Lookup Database](https://md5.gromweb.com/)
- [CrackStation](https://crackstation.net/)

### Web Development Tools:
- [Browser Developer Tools Guide](https://developer.mozilla.org/en-US/docs/Tools)
- [JavaScript Debugging](https://developers.google.com/web/tools/chrome-devtools/javascript)

For additional support or questions about this challenge setup, refer to the main writeup document or contact the challenge creator.