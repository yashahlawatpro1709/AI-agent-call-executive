import os
try:
    from openai import OpenAI
    from twilio.rest import Client
    from gtts import gTTS
    import speech_recognition as sr
    from dotenv import load_dotenv
except ImportError as e:
    print(f"Error importing required packages: {e}")
    print("Please make sure all packages are installed using:")
    print("pip install SpeechRecognition gTTS openai python-dotenv twilio")
    raise

class AICallingAgent:
    def __init__(self):
        load_dotenv()
        
        # Add error checking for environment variables
        if not os.getenv('OPENAI_API_KEY'):
            raise ValueError("OPENAI_API_KEY not found in environment")
            
        self.openai_client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
        self.conversation_history = [
            {"role": "system", "content": """You are a friendly and professional AI assistant. 
            Your goal is to be helpful, empathetic, and natural in conversation. 
            Listen carefully to your owners concerns and provide relevant solutions.
            Speak in a real human tone while maintaining human tone and human way of conversation."""}
        ]
        
        try:
            self.twilio_client = Client(
                os.getenv('TWILIO_ACCOUNT_SID'),
                os.getenv('TWILIO_AUTH_TOKEN')
            )
            self.twilio_number = os.getenv('TWILIO_PHONE_NUMBER')
            if not self.twilio_number:
                raise ValueError("Twilio phone number not found in environment")
        except Exception as e:
            print(f"Failed to initialize Twilio: {e}")
            raise

    def get_ai_response(self, user_input):
        self.conversation_history.append({"role": "user", "content": user_input})
        
        response = self.openai_client.chat.completions.create(
            model="gpt-4",
            messages=self.conversation_history,
            max_tokens=100,
            temperature=0.7
        )
        
        ai_response = response.choices[0].message.content
        self.conversation_history.append({"role": "assistant", "content": ai_response})
        return ai_response

    def make_call(self, to_number):
        try:
            ngrok_url = "https://31ce-103-159-45-178.ngrok-free.app"
            twiml = f"""
                <Response>
                    <Say voice="alice">Hello! I'm your AI assistant calling to help you today. How may I assist you?</Say>
                    <Pause length="1"/>
                    <Gather input="speech" timeout="7" action="{ngrok_url}/handle-input" method="POST">
                        <Say voice="alice">Please tell me what you need help with.</Say>
                    </Gather>
                </Response>
            """
            
            call = self.twilio_client.calls.create(
                twiml=twiml,
                to=to_number,
                from_=self.twilio_number,
                record=True,
                status_callback=f'{ngrok_url}/call-status',
                status_callback_event=['initiated', 'ringing', 'answered', 'completed']
            )
            return call.sid
        except Exception as e:
            print(f"Error type: {type(e).__name__}")
            print(f"Error details: {str(e)}")
            return None

    def handle_user_input(self, user_input):
        ai_response = self.get_ai_response(user_input)
        return f"""
            <Response>
                <Say voice="alice">{ai_response}</Say>
                <Pause length="1"/>
                <Gather input="speech" timeout="5" action="https://31ce-103-159-45-178.ngrok-free.app/handle-input" method="POST">
                    <Say voice="alice">Is there anything else I can help you with?</Say>
                </Gather>
            </Response>
        """

if __name__ == "__main__":
    # Test the agent
    agent = AICallingAgent()
    test_number = "+919845503430"  # Your verified number
    call_id = agent.make_call(test_number)
    print(f"Call initiated with ID: {call_id}")