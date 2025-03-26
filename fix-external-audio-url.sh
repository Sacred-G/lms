#!/bin/bash
# This script fixes the external audio URL feature on the VPS
# For Windows users: Run this script using Git Bash or WSL

# VPS SSH details
VPS_SSH="root@147.93.41.71"
VPS_APP_PATH="/home/lms"

echo "Starting fix for external audio URL feature on VPS..."

# Create a temporary directory for the files we need to check
mkdir -p temp_fix

# Create the files to check if they exist and have the correct content
cat > temp_fix/upload.controller.ts << 'EOL'
// Check if registerExternalAudioUrl function exists
export const registerExternalAudioUrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const { url, fileName } = req.body as ExternalUrlRequest;
    
    if (!url || !fileName) {
      res.status(400).json({ message: 'URL and fileName are required' });
      return;
    }
    
    console.log('Registering external audio URL:', url);
    console.log('With file name:', fileName);
    
    // Validate URL format
    try {
      new URL(url);
    } catch (e) {
      res.status(400).json({ message: 'Invalid URL format' });
      return;
    }
    
    // Return the external URL
    res.status(200).json({ 
      url: url,
      fileName: safeFileName,
      originalName: fileName,
      isExternal: true
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
EOL

cat > temp_fix/upload.routes.ts << 'EOL'
// Check if external audio route exists
router.post('/external-audio', registerExternalAudioUrl);
EOL

cat > temp_fix/uploadService.ts << 'EOL'
// Check if registerExternalAudioUrl function exists
registerExternalAudioUrl: async (url: string, fileName: string): Promise<{ url: string; fileName: string; originalName: string }> => {
  const response = await api.post('/upload/external-audio', {
    url,
    fileName
  });
  
  return response.data;
},
EOL

cat > temp_fix/SectionManagement.tsx << 'EOL'
// Check if external URL checkbox exists
<Form.Check
  type="checkbox"
  id="use-external-audio"
  label="Use external audio URL (e.g., Google Drive)"
  checked={useExternalAudioUrl}
  onChange={(e) => setUseExternalAudioUrl(e.target.checked)}
  className="mb-3"
/>
EOL

# Sync the temporary files to the VPS
echo "Syncing check files to VPS..."
rsync -avz temp_fix/ ${VPS_SSH}:${VPS_APP_PATH}/temp_fix/

# SSH into VPS to check and fix the files
echo "Checking and fixing files on VPS..."
ssh ${VPS_SSH} << 'EOF'
  cd /home/lms

  # Check upload controller
  echo "Checking upload controller..."
  if ! grep -q "registerExternalAudioUrl" src/controllers/upload.controller.ts; then
    echo "External audio URL function missing in upload controller. Fixing..."
    cat >> src/controllers/upload.controller.ts << 'EOL'

// Handle external audio URL registration
export const registerExternalAudioUrl = async (req: Request, res: Response): Promise<void> => {
  try {
    const { url, fileName } = req.body as ExternalUrlRequest;
    
    if (!url || !fileName) {
      res.status(400).json({ message: 'URL and fileName are required' });
      return;
    }
    
    console.log('Registering external audio URL:', url);
    console.log('With file name:', fileName);
    
    // Validate URL format
    try {
      new URL(url);
    } catch (e) {
      res.status(400).json({ message: 'Invalid URL format' });
      return;
    }
    
    // Generate a safe filename
    const safeFileName = fileName.replace(/\s+/g, '_');
    
    // Return the external URL
    res.status(200).json({ 
      url: url,
      fileName: safeFileName,
      originalName: fileName,
      isExternal: true
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
EOL
  else
    echo "External audio URL function exists in upload controller."
  fi

  # Check upload routes
  echo "Checking upload routes..."
  if ! grep -q "external-audio" src/routes/upload.routes.ts; then
    echo "External audio URL route missing in upload routes. Fixing..."
    # Add the route manually to avoid sed quote escaping issues
    cat > temp_route.txt << 'EOL'
router.post('/external-audio', registerExternalAudioUrl);
EOL
    # Find the line with audio upload route and add the external audio route after it
    line_number=$(grep -n "router.post.*audio" src/routes/upload.routes.ts | head -1 | cut -d: -f1)
    if [ -n "$line_number" ]; then
      line_number=$((line_number + 1))
      sed -i "${line_number}r temp_route.txt" src/routes/upload.routes.ts
      rm temp_route.txt
    else
      echo "Could not find audio route line. Adding at the end of routes."
      echo "router.post('/external-audio', registerExternalAudioUrl);" >> src/routes/upload.routes.ts
    fi
  else
    echo "External audio URL route exists in upload routes."
  fi

  # Check upload service
  echo "Checking upload service..."
  if ! grep -q "registerExternalAudioUrl" client/src/services/uploadService.ts; then
    echo "External audio URL function missing in upload service. Fixing..."
    # Add the function manually to avoid sed quote escaping issues
    cat > temp_service.txt << 'EOL'
  // Register external audio URL (like Google Drive)
  registerExternalAudioUrl: async (url: string, fileName: string): Promise<{ url: string; fileName: string; originalName: string }> => {
    const response = await api.post('/upload/external-audio', {
      url,
      fileName
    });
    
    return response.data;
  },
EOL
    # Find the line with uploadAudio and add the external audio function after it
    line_number=$(grep -n "uploadAudio" client/src/services/uploadService.ts | head -1 | cut -d: -f1)
    if [ -n "$line_number" ]; then
      line_number=$((line_number + 1))
      sed -i "${line_number}r temp_service.txt" client/src/services/uploadService.ts
      rm temp_service.txt
    else
      echo "Could not find uploadAudio function. Adding at the end of the service."
      # Create a file with the function content
      cat > temp_service_fallback.txt << 'EOL'

  // Register external audio URL (like Google Drive)
  registerExternalAudioUrl: async (url: string, fileName: string): Promise<{ url: string; fileName: string; originalName: string }> => {
    const response = await api.post('/upload/external-audio', {
      url,
      fileName
    });
    
    return response.data;
  },
EOL
      # Find the uploadService object opening and add after it
      line_number=$(grep -n "export const uploadService" client/src/services/uploadService.ts | head -1 | cut -d: -f1)
      if [ -n "$line_number" ]; then
        # Find the opening brace after uploadService
        brace_line=$(tail -n +$line_number client/src/services/uploadService.ts | grep -n "{" | head -1 | cut -d: -f1)
        if [ -n "$brace_line" ]; then
          insert_line=$((line_number + brace_line))
          sed -i "${insert_line}r temp_service_fallback.txt" client/src/services/uploadService.ts
          rm temp_service_fallback.txt
        else
          echo "Could not find opening brace for uploadService. Skipping."
        fi
      else
        echo "Could not find uploadService declaration. Skipping."
      fi
    fi
  else
    echo "External audio URL function exists in upload service."
  fi

  # Check SectionManagement component
  echo "Checking SectionManagement component..."
  if ! grep -q "use-external-audio" client/src/components/admin/SectionManagement.tsx; then
    echo "External audio URL checkbox missing in SectionManagement. Fixing..."
    # Add the checkbox manually to avoid sed quote escaping issues
    cat > temp_checkbox.txt << 'EOL'
                <Form.Check
                  type="checkbox"
                  id="use-external-audio"
                  label="Use external audio URL (e.g., Google Drive)"
                  checked={useExternalAudioUrl}
                  onChange={(e) => setUseExternalAudioUrl(e.target.checked)}
                  className="mb-3"
                />
EOL
    # Find the line with Audio File and add the checkbox after it
    line_number=$(grep -n "Audio File" client/src/components/admin/SectionManagement.tsx | head -1 | cut -d: -f1)
    if [ -n "$line_number" ]; then
      line_number=$((line_number + 1))
      sed -i "${line_number}r temp_checkbox.txt" client/src/components/admin/SectionManagement.tsx
      rm temp_checkbox.txt
    else
      echo "Could not find Audio File line. Adding at the beginning of the form."
      sed -i '/<Form>/a \\n                <Form.Check\n                  type="checkbox"\n                  id="use-external-audio"\n                  label="Use external audio URL (e.g., Google Drive)"\n                  checked={useExternalAudioUrl}\n                  onChange={(e) => setUseExternalAudioUrl(e.target.checked)}\n                  className="mb-3"\n                />' client/src/components/admin/SectionManagement.tsx
    fi
  else
    echo "External audio URL checkbox exists in SectionManagement."
  fi

  # Clean up
  rm -rf temp_fix

  # Rebuild the application
  echo "Rebuilding the application..."
  npm run build
  cd client && npm run build && cd ..

  # Restart services
  echo "Restarting services..."
  if command -v pm2 &> /dev/null; then
    pm2 restart all
  elif [ -f "docker-compose.yml" ]; then
    docker-compose down && docker-compose up -d
  else
    echo "No process manager detected. Please restart your application manually."
  fi

  echo "Fix completed on VPS!"
EOF

# Clean up temporary directory
rm -rf temp_fix

echo "Fix for external audio URL feature completed!"
echo "Your VPS should now have the option to use external URLs for audio files."
