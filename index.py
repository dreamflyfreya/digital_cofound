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

create_cofounder_response = "You are a 60 seconds pitch deck developer that generate pitch for Storytell.ai, \
it builds chatbots and knowledge base for companies, you would like to \
generate pitch deck for this product."

@app.post('/api/create_cofounder')
def create_cofounder(request: Request):
    # introduction = "Henry is starting a company called HenryAI and needs cofounder\n"
    # with open("r", "company_profile.txt") as f:
    #     company_profile = f"the profile of HenryAI is {f.open()} \n"
    #     f.close()
    # with open("r", "cofounder_team.txt") as f:
    #     founder_team = f"the best cofounder team is {f.open()} \n"
    #     f.close()
    # model = genai.GenerativeModel(
    #     'models/gemini-1.5-pro-latest',
    #     system_instruction=[
    #         introduction,
    #         company_profile,
    #         founder_team,
    #         "can you create a profile"
    #     ],
    # )

    # # send api and prompts
    # # Set model parameters
    # response = model.generate_content("Can you generate a profile for ")
    
    with open("profile.txt", "w") as f:
        f.write(create_cofounder_response)
    return create_cofounder_response

@app.post('/api/do_task')
def do_task(request: Request):
    body = request.json()
    introduction = "you are a cofounder of a company for Storytell.AI\n \
        "
    with open("profile.txt", "r") as f:
        cofounder_profile = f"your profile is {f.read()} \n"
    model = genai.GenerativeModel(
        'models/gemini-1.5-pro-latest',
        system_instruction=[
            introduction,
            cofounder_profile,
        ],
    )

    response = model.generate_content("Please do the task as instructed")

    return response.text

if __name__ == "__main__":
    uvicorn.run("index:app", host='localhost', port=61001, reload=True)
