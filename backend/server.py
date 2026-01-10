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
#from emergentintegrations.llm.chat import LlmChat, UserMessage


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
#mongo_url = os.environ['MONGO_URL']
#client = AsyncIOMotorClient(mongo_url)
#db = client[os.environ['DB_NAME']]

# Emergent LLM Key
#EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY', 'sk-emergent-f2cD109Cd9dF400B99')

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


@api_router.post("/ai/voice-calculate", response_model=VoiceCalculateResponse)
async def voice_calculate(request: VoiceCalculateRequest):
    query = request.query
    query_lower = query.lower()
    try:
        # Voice madhle 'plus', 'x' ya shabdanna math symbols madhe badla
        clean_query = query_lower.replace("x", "*").replace("plus", "+").replace("minus", "-").replace("divided by", "/")
        
        # Fakt numbers aani math symbols asel tarach calculate kara
        allowed_chars = "0123456789+-*/(). "
        if any(char.isdigit() for char in clean_query) and all(c in allowed_chars for c in clean_query):
            calc_result = eval(clean_query)
            result = f"The answer is {calc_result}"
        else:
            result = f"I received: '{query}'. Please ask a math question like '10 plus 20'."
    except Exception as e:
        result = f"Calculation Error: {str(e)}"

    return VoiceCalculateResponse(result=result)





# AI Voice Calculator - या फंक्शनमध्ये Indentation 100% बरोबर सेट केले आहे
#@api_router.post("/ai/voice-calculate", response_model=VoiceCalculateResponse)
#async def voice_calculate(request: VoiceCalculateRequest):
    # 4 Spaces: Code within the function
 #   query = request.query
  #  query_lower = query.lower()
    
    # 4 Spaces: Start of the if/elif block
   # if "45 plus 18 percent of 200" in query_lower:
        # 8 Spaces: Code within the if block
    #    result = "The calculated answer is 81."
        
 #   elif "square root of 144" in query_lower:
        # 8 Spaces: Code within the elif block
  #      result = "The square root of 144 is 12."
        
   # else:
        # 8 Spaces: Code within the else block
    #    result = f"I received your query: '{query}'. This is a successful mock response."
    
    # 4 Spaces: End of the function
   # return VoiceCalculateResponse(result=result)
# AI Voice Calculator
#x@api_router.post("/ai/voice-calculate", response_model=VoiceCalculateResponse)
# async def voice_calculate(request: VoiceCalculateRequest):
   # try:
        # Initialize LLM Chat
    #    chat = LlmChat(
     #       api_key=EMERGENT_LLM_KEY,
      #      session_id=f"voice-calc-{uuid.uuid4()}",
       #     system_message="You are a helpful calculator assistant. When given a math question in natural language, provide the numerical answer directly without explanation. Be concise. For example, if asked 'What is 45 plus 18 percent of 200?', just respond with the final number and brief context like 'The answer is 81' (45 + 36 = 81, where 18% of 200 is 36)."
      #  ).with_model("openai", "gpt-4o-mini")
        
        # Create user message
       # user_message = UserMessage(text=request.query)
        
        # Get response
 # /        response = await chat.send_message(user_message)
        
        # Save to history
  #      history = CalculationHistory(
   #         type="voice",
    #        expression=request.query,
     #       result=response,
      #      timestamp=datetime.utcnow()
       # )
      #  await db.calculation_history.insert_one(history.dict())
        
      #  return VoiceCalculateResponse(result=response)
        
  #  except Exception as e:
   #     logger.error(f"Voice calculation error: {str(e)}")
    #    raise HTTPException(status_code=500, detail=f"Error processing calculation: {str(e)}")



#async def voice_calculate(request: VoiceCalculateRequest):
    # 4 Spaces Indentation
  #  query = request.query
 #   query_lower = query.lower() 

    # 4 Spaces Indentation (if, elif, else)


#if "45 plus 18 percent of 200" in query_lower:
   #     result = "The calculated answer is 81."
  #  elif "square root of 144" in query_lower:
  #      result = "The square root of 144 is 12."
  #  elif "25 times 4 divided by 2" in query_lower:
   #     result = "The result is 50."
   # elif "15 percent of 500" in query_lower:
    #    result = "75 is the answer."
   # elif "calculate 5 factorial" in query_lower:
    #    result = "5 factorial is 120."
   # elif "2 to the power of 10" in query_lower:
    #    result = "2 to the power of 10 is 1024."
 #   else:
  # इतर कोणत्याही इनपुटसाठी हे उत्तर द्या
#result = f"I received your query: '{query}'. This is a successful mock response."

 # 4 Spaces Indentation
#    return VoiceCalculateResponse(result=result)

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
#@api_router.get("/history")
#async def get_calculation_history():
 #   history = await db.calculation_history.find().sort("timestamp", -1).to_list(100)
  #  return history


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

#@app.on_event("shutdown")
#async def shutdown_db_client():
 #   client.close()
