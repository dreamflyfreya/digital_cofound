from fastapi import FastAPI, APIRouter, File, UploadFile, Response, Request
app = FastAPI()

import google.generativeai as genai

# Used to securely store your API key
# from google.colab import userdata
import uvicorn
# Or use `os.getenv('GOOGLE_API_KEY')` to fetch an environment variable.
# GOOGLE_API_KEY=userdata.get('GOOGLE_API_KEY')




# model = genai.GenerativeModel('gemini-pro')

# response = model.generate_content("What is the meaning of life?")

# messages = []

genai.configure(api_key=GOOGLE_API_KEY)


@app.post('/api/create_cofounder')
def create_cofounder(request: Request):
    introduction = "Henry is starting a company called HenryAI and needs cofounder\n"
    with open("r", "company_profile.txt") as f:
        company_profile = f"the profile of HenryAI is {f.open()} \n"
        f.close()
    with open("r", "cofounder_team.txt") as f:
        founder_team = f"the best cofounder team is {f.open()} \n"
        f.close()
    model = genai.GenerativeModel(
        'models/gemini-1.5-pro-latest',
        system_instruction=[
            introduction,
            company_profile,
            founder_team,
            "can you create a profile"
        ],
    )

    # send api and prompts
    # Set model parameters
    response = model.generate_content("Can you generate a profile for ")
    
    with open("wr", "profile.txt") as f:
        f.write(response.text)
    return response.text

@app.post('/api/do_task')
def do_task(request: Request):
    body = request.json()
    introduction = "you are a cofounder of a company \n"
    with open("r", "profile.txt") as f:
        cofounder_profile = f"your profile is {f.read()} \n"
    with open("r", "knowledge_base.txt") as f:
        knowledge_base_profile = f"your knowledge base is {f.read()} \n"
    model = genai.GenerativeModel(
        'models/gemini-1.5-pro-latest',
        system_instruction=[
            introduction,
            cofounder_profile,
            knowledge_base_profile,
        ],
    )

    response = model.generate_content("Please generate a task")

    return response.text

if __name__ == "__main__":
    uvicorn.run("index:app", host='localhost', port=61001, reload=True)
