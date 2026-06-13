import os
import re

files_to_fix = [
    'src/app/dashboard/digital-twin/page.tsx',
    'src/app/dashboard/pitch-deck/page.tsx',
    'src/app/dashboard/branding/page.tsx'
]

def process_file(filepath):
    if not os.path.exists(filepath):
        print(f"Skipping {filepath}, does not exist")
        return

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Make sure we import getToken
    if 'useProject' in content and 'useAuth' not in content:
        content = content.replace('import { useProject } from "@/hooks/useProject";', 'import { useProject } from "@/hooks/useProject";\nimport { useAuth } from "@clerk/nextjs";')
    
    # Add getToken to the component
    if 'const { project } = useProject();' in content:
        content = content.replace('const { project } = useProject();', 'const { project } = useProject();\n  const { getToken } = useAuth();')

    # Fix fetch inside useEffect
    # Replace fetch(..., { method: 'POST' }) with async fetch 
    
    # We'll use regex to find fetch calls and replace them
    # Because we need async to use await getToken(), we must change the useEffect or the then chain.
    # It's easier to just write the replacement manually since there are only 3 files.

    if 'fetch(http://localhost:5000/api/projects//digital-twin, { method: \'POST\' })' in content:
        content = content.replace(
            "fetch(http://localhost:5000/api/projects//digital-twin, { method: 'POST' })",
            "getToken().then(token => fetch(http://localhost:5000/api/projects//digital-twin, { method: 'POST', headers: { 'Authorization': Bearer  } }))"
        )
        
    if 'fetch(http://localhost:5000/api/projects//pitch-deck, { method: \'POST\' })' in content:
        content = content.replace(
            "fetch(http://localhost:5000/api/projects//pitch-deck, { method: 'POST' })",
            "getToken().then(token => fetch(http://localhost:5000/api/projects//pitch-deck, { method: 'POST', headers: { 'Authorization': Bearer  } }))"
        )

    if 'fetch(http://localhost:5000/api/projects//branding, { method: \'POST\' })' in content:
        content = content.replace(
            "fetch(http://localhost:5000/api/projects//branding, { method: 'POST' })",
            "getToken().then(token => fetch(http://localhost:5000/api/projects//branding, { method: 'POST', headers: { 'Authorization': Bearer  } }))"
        )
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Fixed {filepath}")

for f in files_to_fix:
    process_file(f)

# Simulation page has a slightly different fetch
sim_path = 'src/app/dashboard/simulation/page.tsx'
if os.path.exists(sim_path):
    with open(sim_path, 'r', encoding='utf-8') as f:
        sim_content = f.read()
    
    if 'useAuth' not in sim_content:
        sim_content = sim_content.replace('import { useProject } from "@/hooks/useProject";', 'import { useProject } from "@/hooks/useProject";\nimport { useAuth } from "@clerk/nextjs";')
        
    if 'const { project } = useProject();' in sim_content:
        sim_content = sim_content.replace('const { project } = useProject();', 'const { project } = useProject();\n  const { getToken } = useAuth();')

    # Fix the fetch inside handleSimulation
    if 'const res = await fetch(http://localhost:5000/api/projects//simulate, {' in sim_content:
        sim_content = sim_content.replace(
            "const res = await fetch(http://localhost:5000/api/projects//simulate, {\n        method: 'POST',\n        headers: { 'Content-Type': 'application/json' },",
            "const token = await getToken();\n      const res = await fetch(http://localhost:5000/api/projects//simulate, {\n        method: 'POST',\n        headers: { 'Content-Type': 'application/json', 'Authorization': Bearer  },"
        )

    with open(sim_path, 'w', encoding='utf-8') as f:
        f.write(sim_content)
    print(f"Fixed {sim_path}")
        
print("Done")
