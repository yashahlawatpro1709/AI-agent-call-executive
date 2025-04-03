from flask import Flask, request, jsonify
from flask_cors import CORS
from ai_agent import AICallingAgent

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
agent = AICallingAgent()

@app.route('/handle-input', methods=['POST'])
def handle_input():
    try:
        speech_result = request.values.get('SpeechResult', '')
        print(f"Received speech: {speech_result}")  # Debug log
        if not speech_result:
            return """
                <Response>
                    <Say voice="alice">I couldn't hear you. Could you please repeat that?</Say>
                    <Gather input="speech" timeout="5" action="/handle-input" method="POST"/>
                </Response>
            """
        response = agent.handle_user_input(speech_result)
        print(f"AI Response: {response}")  # Debug log
        return response
    except Exception as e:
        print(f"Error in handle_input: {str(e)}")  # Debug log
        return """
            <Response>
                <Say voice="alice">I apologize, but I encountered an error. Let me try again.</Say>
                <Gather input="speech" timeout="5" action="/handle-input" method="POST"/>
            </Response>
        """

@app.route('/call-status', methods=['POST'])
def call_status():
    status = request.values.get('CallStatus', '')
    print(f"Call Status: {status}")
    return '', 200

@app.route('/make-call', methods=['POST'])
def make_call():
    try:
        phone_number = request.json.get('phoneNumber')
        call_id = agent.make_call(phone_number)
        return jsonify({'success': True, 'callId': call_id})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5050, debug=True)