tell application "iTerm2"
    tell current session of current window
        set newSession to split vertically with default profile
        write text "cd frontend/ && npm run dev"
    end tell
    
    tell newSession
        -- local build
        -- write text "cd backend/ && go build -o out && ./out"
        -- docker build
        write text "docker compose up"
    end tell
end tell