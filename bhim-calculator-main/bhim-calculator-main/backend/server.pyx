from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime
import httpx
import re
import math

#from emergentintegrations.llm.chat import LlmChat, UserMessage


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
#mongo_url = os.environ['MONGO_URL']
#client = AsyncIOMotorClient(mongo_url)
#db = client[os.environ['DB_NAME']]
#db = client[os.getenv('DB_NAME', 'bhim_calculator')]

# त्याऐवजी हा नवीन 'Safe' कोड टाका:
mongo_url = os.getenv('MONGO_URL', 'mongodb://127.0.0.1:27017')
db_name = os.getenv('DB_NAME', 'bhim_calculator')

client = AsyncIOMotorClient(mongo_url)
db = client[db_name]


# Emergent LLM Key
#EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY', 'sk-emergent-f2cD109Cd9dF400B99')
EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY')

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class VoiceCalculateRequest(BaseModel):
    query: str

class VoiceCalculateResponse(BaseModel):
    result: str

class CurrencyConvertRequest(BaseModel):
    amount: float
    from_currency: str = Field(alias="from")
    to_currency: str = Field(alias="to")

class CurrencyConvertResponse(BaseModel):
    result: float
    from_currency: str
    to_currency: str
    amount: float

class CalculationHistory(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    type: str  # 'basic', 'scientific', 'voice', etc.
    expression: str
    result: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)


# Basic routes
@api_router.get("/")
async def root():
    return {"message": "Bhim Universal Calculator API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]


# AI Voice Calculator
"""
@api_router.post("/ai/voice-calculate", response_model=VoiceCalculateResponse)
async def voice_calculate(request: VoiceCalculateRequest):
    try:
      
      # सध्या LLM ऐवजी साधे उत्तर पाठवूया (Test साठी)
        response = f"बॅकएंडला तुमचा मेसेज मिळाला: {request.query}"
        return VoiceCalculateResponse(result=response)
    except Exception as e:
        # ... बाकी कोड तसाच राहू द्या


        # Initialize LLM Chat
        chat = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=f"voice-calc-{uuid.uuid4()}",
            system_message="You are a helpful calculator assistant. When given a math question in natural language, provide the numerical answer directly without explanation. Be concise. For example, if asked 'What is 45 plus 18 percent of 200?', just respond with the final number and brief context like 'The answer is 81' (45 + 36 = 81, where 18% of 200 is 36)."
        ).with_model("openai", "gpt-4o-mini")
        
        # Create user message
        user_message = UserMessage(text=request.query)
        
        # Get response
        response = await chat.send_message(user_message)
        
        # Save to history
        history = CalculationHistory(
            type="voice",
            expression=request.query,
            result=response,
            timestamp=datetime.utcnow()
        )
        await db.calculation_history.insert_one(history.dict())
        
        return VoiceCalculateResponse(result=response)
        
    except Exception as e:
        logger.error(f"Voice calculation error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing calculation: {str(e)}")
"""

# AI Voice Calculator
"""
# येथे फक्त "/voice" ठेवा, कारण "api_router" आपोआप "/api" जोडतो.
@api_router.post("/voice", response_model=VoiceCalculateResponse)
async def voice_calculate(request: VoiceCalculateRequest):
    try:
        # सध्यातरी एआयशिवाय साधे उत्तर पाठवूया
        response_text = f"बॅकएंडला तुमचा प्रश्न मिळाला: {request.query}"
        
        # हिस्टरी सेव्ह करण्याचा प्रयत्न (Optional)
        try:
            history = CalculationHistory(
                type="voice",
                expression=request.query,
                result=response_text,
                timestamp=datetime.utcnow()
            )
            await db.calculation_history.insert_one(history.dict())
        except Exception as db_e:
            print(f"Database error: {db_e}")

        return VoiceCalculateResponse(result=response_text)

    except Exception as e:
        logging.error(f"Voice calculation error: {str(e)}")
        raise HTTPException(status_code=500, detail="Error processing voice request")

# शेवटी हा राउटर मुख्य ॲपला जोडा (हे ओळ तुमच्या कोडमध्ये शेवटी असावी)
app.include_router(api_router)

"""


# AI Voice Calculator

# जुना कोड सुरक्षित ठेवण्यासाठी सुरुवातीला तीन कोट्स टाका
"""
@api_router.post("/ai/voice-calculate", response_model=VoiceCalculateResponse)
async def voice_calculate(request: VoiceCalculateRequest):
    try:
        chat = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=f"voice-calc-{uuid.uuid4()}",
            ...
        )
        ...
        return VoiceCalculateResponse(result=response)
    except Exception as e:
        ...
"""
# येथे तीन कोट्स संपवा. आता वरचा कोड पायथन वाचणार नाही.

# --- हा नवीन आणि सोपा कोड खाली पेस्ट करा ---
#@api_router.post("/voice", response_model=VoiceCalculateResponse)
#async def voice_calculate(request: VoiceCalculateRequest):
 #   try:
        # टेस्टिंगसाठी आपण जे विचारले तेच उत्तर परत पाठवूया
  #      mock_answer = f"बॅकएंड उत्तर: {request.query} चे उत्तर ९ आहे (Testing)"
   #     return VoiceCalculateResponse(result=mock_answer)
   # except Exception as e:
    #    return VoiceCalculateResponse(result="Error: " + str(e))

"""@api_router.post("/voice", response_model=VoiceCalculateResponse)
async def voice_calculate(request: VoiceCalculateRequest):
    try:
        # १. युजरचा प्रश्न (उदा. "3+6") छोट्या अक्षरात करा
        query = request.query.lower()
        print(f"User Query: {query}")

        # २. शब्दांचे चिन्हात रूपांतर करा
        expression = query.replace('plus', '+').replace('minus', '-').replace('into', '*').replace('divided by', '/')
        
        # ३. सुरक्षेसाठी फक्त अंक आणि गणिती चिन्हेच ठेवा
        clean_expr = re.sub(r'[^0-9+\-*/.]', '', expression)

        if clean_expr:
            # ४. पायथनच्या eval() ने प्रत्यक्ष उत्तर काढा
            result_value = eval(clean_expr)
            final_answer = f"{query} चे उत्तर {result_value} आहे."
        else:
            final_answer = "क्षमस्व, मला हे गणित समजले नाही."

        return VoiceCalculateResponse(result=final_answer)

    except ZeroDivisionError:
        return VoiceCalculateResponse(result="शून्याने भागता येत नाही.")
    except Exception as e:
        print(f"Error: {e}")
        return VoiceCalculateResponse(result="हे गणित सोडवताना अडचण येत आहे.")

"""

#@api_router.post("/voice", response_model=VoiceCalculateResponse)
#async def voice_calculate(request: VoiceCalculateRequest):
 #   query = request.query
 #   print(f"User Query: {query}") 

#@api_router.post("/voice", response_model=VoiceCalculateResponse)
#async def voice_calculate(request: VoiceCalculateRequest):
 #   query = request.query
  #  print(f"User Query: {query}")

   # try:
        # १. पर्यावरणातून की मिळवा
    #    api_key = os.getenv("EMERGENT_LLM_KEY")

        # २. Gemini API URL
       # gemini_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
      # gemini_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
      #  gemini_url = f"https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key={api_key}"
    # gemini_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
   # gemini_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={api_key}"



    #    async with httpx.AsyncClient() as client:
     #       response = await client.post(
      #          gemini_url,
       #         headers={"Content-Type": "application/json"},
        #       json={
          #          "contents": [{
         #               "parts": [{"text": f"Solve this math problem and give only the final answer: {query}"}]
         #           }]
          #      },
           #     timeout=15.0
          #  )

      #  if response.status_code == 200:
       #     resp_data = response.json()
        #    result = resp_data['candidates'][0]['content']['parts'][0]['text']
         #   return VoiceCalculateResponse(result=result.strip())
      #  else:
       #     raise Exception(f"Gemini API Error: {response.status_code}")

#    except Exception as ai_err:
 #       print(f"AI Error: {ai_err}")
        # एआय काम करत नसेल तर साध्या गणिताचा वापर करा
  #      return VoiceCalculateResponse(result="क्षमस्व, एआय कनेक्ट होऊ शकले नाही.")



        
       # async with httpx.AsyncClient() as client:
           # response = await client.post(
           #    "https://api.emergent.ai/v1/chat/completions", # तुमच्या प्रोव्हायडरची URL
          #      headers={"Authorization": f"Bearer {api_key}"},
         #       json={
        #            "model": "gpt-3.5-turbo",
       #             "messages": [
      #                  {"role": "system", "content": "You are a math expert. Answer in Marathi. Example: '2+2 चे उत्तर 4 आहे.'"},
     #                   {"role": "user", "content": query}
    #                ]
   #             },
  #              timeout=10.0
 #           )
#
   #     if response.status_code == 200:
  #          result = response.json()['choices'][0]['message']['content']
 #           return VoiceCalculateResponse(result=result)
#            
  #  except Exception as ai_err:
 #       print(f"AI Error, switching to basic mode: {ai_err}")
#
    # २. बॅकअप (Fallback): जर एआय चालला नाही, तर तुमचे जुने 'Eval' लॉजिक चालेल
   # try:
     #   expression = query.lower().replace('plus', '+').replace('minus', '-').replace('into', '*').replace('divided by', '/')
      #  clean_expr = re.sub(r'[^0-9+*/.-]', '', expression)
     #   if clean_expr:
    #        res = eval(clean_expr)
   #         return VoiceCalculateResponse(result=f"{query} चे उत्तर {res} आहे. (Basic Mode)")
  #  except:
 #       pass

#    return VoiceCalculateResponse(result="क्षमस्व, मी हे गणित सोडवू शकलो नाही.")



# फाईलच्या शेवटी हे तपासा
"""app.include_router(api_router)  

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
"""



"""

@api_router.post("/voice", response_model=VoiceCalculateResponse)
async def voice_calculate(request: VoiceCalculateRequest):
    query = request.query
    print(f"User Query: {query}")

    try:
        # १. .env मधून की मिळवा
        api_key = os.getenv("EMERGENT_LLM_KEY")

        # २. Gemini API URL (ही ओळ 'try' च्या आतच हवी)
       # gemini_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"

    gemini_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"

        async with httpx.AsyncClient() as client:
            response = await client.post(
                gemini_url,
                headers={"Content-Type": "application/json"},
                json={
                    "contents": [{
                        "parts": [{"text": f"Solve this math problem and give only the final numerical answer: {query}"}]
                    }]
                },
                timeout=15.0
            )

        # ३. उत्तर तपासा आणि पाठवा
        if response.status_code == 200:
            resp_data = response.json()
            result = resp_data['candidates'][0]['content']['parts'][0]['text']
            return VoiceCalculateResponse(result=result.strip())
        else:
            print(f"Gemini API Error: {response.status_code}")
            raise Exception("Gemini API Call Failed")

    except Exception as ai_err:
        # ४. जर काही चूक झाली तर हा ब्लॉक चालतो
        print(f"AI Error: {ai_err}")
        return VoiceCalculateResponse(result="क्षमस्व, एआय कनेक्ट होऊ शकले नाही.")

"""
"""


@api_router.post("/voice", response_model=VoiceCalculateResponse)
async def voice_calculate(request: VoiceCalculateRequest):
    query = request.query
    print(f"User Query: {query}")
    
    try:
        # १. .env मधून की मिळवा
        api_key = os.getenv("EMERGENT_LLM_KEY")
        
        # २. Gemini API URL (ही ओळ बरोबर ४ स्पेस पुढे आहे)
       # gemini_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
#gemini_url = f"https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key={AIzaSyCzcDjfw3a155fjdOxwOX_MCi1sY7_k1Mk}"        
gemini_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={api_key}"

#curl "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=AIzaSyCzcDjfw3a155fjdOxwOX_MCi1sY7_k1Mk" \
#-H 'Content-Type: application/json' \
#-X POST \
#-d '{"contents": [{"parts":[{"text": "2+2"}]}]}'


        async with httpx.AsyncClient() as client:
            response = await client.post(
                gemini_url,
                headers={"Content-Type": "application/json"},
                json={
                    "contents": [{
                        "parts": [{"text": f"Solve this math problem and give only the numeric result: {query}"}]
                    }]
                },
                timeout=15.0
            )

        # ३. उत्तर तपासा आणि पाठवा
        if response.status_code == 200:
            resp_data = response.json()
            result = resp_data['candidates'][0]['content']['parts'][0]['text']
            return VoiceCalculateResponse(result=result.strip())
        else:
            print(f"Gemini API Error: {response.status_code}")
            raise Exception(f"Gemini API Call Failed with status {response.status_code}")

    except Exception as ai_err:
        # ४. जर काही चूक झाली तर हा ब्लॉक चालतो
        print(f"AI Error: {ai_err}")
        return VoiceCalculateResponse(result="क्षमस्व, एआय कनेक्ट होऊ शकले नाही.")


"""




@api_router.post("/voice", response_model=VoiceCalculateResponse)
async def voice_calculate(request: VoiceCalculateRequest):
    query = request.query
    print(f"User Query: {query}")

    try:
        # १. .env मधून की मिळवा
        api_key = os.getenv("EMERGENT_LLM_KEY")
        if not api_key:
            raise Exception("API Key not found in environment variables")

        # २. Gemini API URL (ही ओळ बरोबर ४ स्पेस पुढे आहे)
        gemini_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"

        async with httpx.AsyncClient() as client:
            response = await client.post(
                gemini_url,
                headers={"Content-Type": "application/json"},
                json={
                    "contents": [{
                        "parts": [{"text": f"Solve this math problem and give only the answer: {query}"}]
                    }]
                },
                timeout=15.0
            )

        # ३. उत्तर तपासा आणि पाठवा
        if response.status_code == 200:
            resp_data = response.json()
            result = resp_data['candidates'][0]['content']['parts'][0]['text']
            return VoiceCalculateResponse(result=result.strip())
        else:
            print(f"Gemini API Error: {response.status_code} - {response.text}")
            raise Exception(f"Gemini API Call Failed with status {response.status_code}")

    except Exception as ai_err:
        # ४. जर काही चूक झाली तर हा ब्लॉक चालतो
        print(f"AI Error: {ai_err}")
        return VoiceCalculateResponse(result="क्षमस्व, एआय कनेक्ट होऊ शकले नाही.")




# Currency Converter

@api_router.post("/currency/convert", response_model=CurrencyConvertResponse)
async def convert_currency(request: CurrencyConvertRequest):
    try:
        # Use exchangerate-api.com free API
        from_curr = request.from_currency.upper()
        to_curr = request.to_currency.upper()
        
        # Free API endpoint (no key required for basic usage)
        url = f"https://api.exchangerate-api.com/v4/latest/{from_curr}"
        
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
            data = response.json()
            
            if "rates" in data and to_curr in data["rates"]:
                rate = data["rates"][to_curr]
                result = request.amount * rate
                
                return CurrencyConvertResponse(
                    result=round(result, 2),
                    from_currency=from_curr,
                    to_currency=to_curr,
                    amount=request.amount
                )
            else:
                raise HTTPException(status_code=400, detail="Currency not supported")
                
    except httpx.HTTPError as e:
        logger.error(f"Currency API error: {str(e)}")
        # Fallback to mock rates for demo
        mock_rates = {
            "USD": {"INR": 83, "EUR": 0.92, "GBP": 0.79, "JPY": 149},
            "INR": {"USD": 0.012, "EUR": 0.011, "GBP": 0.0095, "JPY": 1.8},
            "EUR": {"USD": 1.09, "INR": 90, "GBP": 0.86, "JPY": 162},
            "GBP": {"USD": 1.27, "INR": 105, "EUR": 1.16, "JPY": 189},
        }
        
        from_curr = request.from_currency.upper()
        to_curr = request.to_currency.upper()
        
        if from_curr in mock_rates and to_curr in mock_rates[from_curr]:
            rate = mock_rates[from_curr][to_curr]
            result = request.amount * rate
            
            return CurrencyConvertResponse(
                result=round(result, 2),
                from_currency=from_curr,
                to_currency=to_curr,
                amount=request.amount
            )
        else:
            raise HTTPException(status_code=500, detail="Currency conversion failed")


# Calculation History
@api_router.get("/history")
async def get_calculation_history():
    history = await db.calculation_history.find().sort("timestamp", -1).to_list(100)
    return history


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

"""
@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
"""

# १. आधी सर्व रस्ते (Routes) एकत्र करा
app.include_router(api_router)

# २. त्यानंतर लॉगिंग कॉन्फिगर करा
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ३. डेटाबेस शटडाउन इव्हेंट
@app.on_event("shutdown")
async def shutdown_db_client():
#if 'client' in globals():
    client.close()

# ४. सर्वात शेवटी 'Main' ब्लॉक
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
