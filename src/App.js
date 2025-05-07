import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;
const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(0, 163, 255, 0.4); }
  70% { box-shadow: 0 0 0 20px rgba(0, 163, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(0, 163, 255, 0); }
`;

// Update Container with parallax effect
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
  color: white;
  overflow-x: hidden;
`;

// Enhanced Navigation
const Nav = styled.nav`
  padding: 1.5rem 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(20px);
  position: fixed;
  width: 100%;
  z-index: 100;
`;

// Update MainSection with Apple-style layout
const MainSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(0,163,255,0.1) 0%, rgba(0,0,0,0) 50%);
    animation: ${rotate} 20s linear infinite;
  }
`;

const Title = styled.h1`
  font-size: 5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 1.5rem;
  background: linear-gradient(90deg, #fff, #00a3ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${shine} 3s linear infinite;
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

// Enhanced Feature Cards
const FeatureCard = styled.div`
  padding: 2.5rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  transition: all 0.5s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: ${fadeIn} 1s ease-out;

  &:hover {
    transform: translateY(-10px);
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    background: linear-gradient(90deg, #fff, #00a3ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

// Enhanced Disc animation
const DiscContainer = styled.div`
  width: 400px;
  height: 400px;
  position: relative;
  margin: 4rem 0;
  animation: ${float} 6s ease-in-out infinite;
  @media (max-width: 768px) {
    width: 300px;
    height: 300px;
  }
`;

// Update CallButton with premium styling
const CallButton = styled.button`
  padding: 1.5rem 3.5rem;
  font-size: 1.2rem;
  background: rgba(0, 163, 255, 0.1);
  border: 1px solid #00a3ff;
  border-radius: 40px;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  
  &:hover {
    transform: scale(1.05);
    background: #00a3ff;
    animation: ${pulse} 1.5s infinite;
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

// Add this new component for the hero visual
// First, add these new animations
const ripple = keyframes`
  0% { transform: scale(0.95); opacity: 0.5; }
  50% { transform: scale(1.05); opacity: 0.3; }
  100% { transform: scale(0.95); opacity: 0.5; }
`;

const floatParticle = keyframes`
  0% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(10px, -10px) rotate(90deg); }
  50% { transform: translate(0, -20px) rotate(180deg); }
  75% { transform: translate(-10px, -10px) rotate(270deg); }
  100% { transform: translate(0, 0) rotate(360deg); }
`;

// Replace the existing HeroVisual component with this enhanced version
const HeroVisual = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    width: 150%;
    height: 150%;
    top: -25%;
    left: -25%;
    background: 
      radial-gradient(circle at 50% 50%, rgba(0,163,255,0.1) 0%, rgba(0,0,0,0) 50%),
      radial-gradient(circle at 20% 30%, rgba(0,255,135,0.05) 0%, rgba(0,0,0,0) 40%),
      radial-gradient(circle at 80% 70%, rgba(0,163,255,0.05) 0%, rgba(0,0,0,0) 40%);
    animation: ${rotate} 30s linear infinite;
  }

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 50% 50%, rgba(0,163,255,0.2) 0%, rgba(0,0,0,0) 30%);
    animation: ${ripple} 5s ease-in-out infinite;
  }
`;

// Add the Particle component
const Particle = styled.div`
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(0, 163, 255, 0.3);
  border-radius: 50%;
  animation: ${floatParticle} 10s infinite linear;

  &:nth-child(2) {
    top: 20%;
    left: 20%;
    animation-delay: -2s;
    animation-duration: 13s;
  }

  &:nth-child(3) {
    top: 50%;
    left: 70%;
    animation-delay: -5s;
    animation-duration: 15s;
  }

  &:nth-child(4) {
    top: 70%;
    left: 30%;
    animation-delay: -7s;
    animation-duration: 11s;
  }
`;

// Add these components after the Nav styled component and before the MainSection

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  background: linear-gradient(90deg, #00a3ff, #00ff87);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto 2rem;
  color: #8892b0;
  animation: ${fadeIn} 1s ease-out;
  line-height: 1.6;
`;

const FeatureSection = styled.section`
  padding: 4rem 2rem;
  background: rgba(13, 27, 42, 0.5);
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const DemoSection = styled.section`
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Disc = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: absolute;
  background: linear-gradient(45deg, #00a3ff, #00ff87);
  animation: ${rotate} 8s linear infinite;
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 80%;
    background: #000000;
    border-radius: 50%;
  }
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20%;
    height: 20%;
    background: #00a3ff;
    border-radius: 50%;
    box-shadow: 0 0 20px #00a3ff;
  }
`;

// Update the StatusText component with enhanced styling
// Add this new animation for success message
const successPop = keyframes`
  0% { transform: scale(0.95); opacity: 0; }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); opacity: 1; }
`;

// Enhanced StatusText with conditional styling
const StatusText = styled.p`
  color: transparent;
  font-size: ${props => props.success ? '1.4rem' : '1.2rem'};
  margin-top: 2rem;
  font-weight: 600;
  background: ${props => props.success 
    ? 'linear-gradient(90deg, #00ff87, #00a3ff, #00ff87)'
    : 'linear-gradient(90deg, #00a3ff, #00ff87, #00a3ff)'};
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${props => props.success ? successPop : fadeIn} 0.5s ease-out,
             ${shine} 3s linear infinite;
  padding: 1rem 2rem;
  border-radius: 30px;
  backdrop-filter: blur(10px);
  border: 2px solid ${props => props.success ? 'rgba(0, 255, 135, 0.3)' : 'rgba(0, 163, 255, 0.2)'};
  box-shadow: ${props => props.success 
    ? '0 0 20px rgba(0, 255, 135, 0.2), inset 0 0 10px rgba(0, 255, 135, 0.1)'
    : 'none'};
  display: flex;
  align-items: center;
  gap: 10px;
  
  &::before {
    content: ${props => props.success ? '"✓"' : '""'};
    font-size: 1.4rem;
    background: inherit;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

// Update in your App component's return statement:
<StatusText success={status === 'Call initiated successfully!'}>
  {status}
</StatusText>


function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');

  const initiateCall = async () => {
    setIsLoading(true);
    setStatus('Initiating call...');
    try {
      const response = await axios.post('https://31ce-103-159-45-178.ngrok-free.app/make-call', {
        phoneNumber: '+919845503430'
      });
      if (response.data.success) {
        setStatus('Call initiated successfully!');
      } else {
        setStatus('Failed to initiate call');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('Error initiating call');
    }
    setIsLoading(false);
  };

  // Add these new styled components after existing ones
  
  const HighlightSection = styled.section`
  padding: 8rem 2rem;
  background: rgba(0, 0, 0, 0.7);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 30% 50%, rgba(0,163,255,0.1) 0%, rgba(0,0,0,0) 50%);
  }
`;
  
  const HighlightGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4rem;
  max-width: 1200px;
  margin: 0 auto;
  align-items: center;
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;
  
  const HighlightContent = styled.div`
  h2 {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 2rem;
    background: linear-gradient(90deg, #fff, #00a3ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  p {
    font-size: 1.2rem;
    line-height: 1.8;
    color: #8892b0;
    margin-bottom: 2rem;
  }
`;
  
  const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 3rem;
`;
  
  const StatItem = styled.div`
  text-align: left;
  
  h3 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    background: linear-gradient(90deg, #00ff87, #00a3ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  p {
    font-size: 1rem;
    color: #8892b0;
  }
`;
  
  const ImageContainer = styled.div`
  position: relative;
  height: 400px;
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  background: linear-gradient(45deg, rgba(0,163,255,0.1), rgba(0,255,135,0.1));
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  
  &::before {
    content: '';
    position: absolute;
    inset: 1px;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 20px;
  }
`;
  
  // Update the return statement to include new sections
  return (
      <Container>
        <Nav>
          <Logo>AI Assistant</Logo>
        </Nav>
        
        <MainSection>
          <HeroVisual>
            <Particle />
            <Particle />
            <Particle />
            <Particle />
          </HeroVisual>
          <Title>Experience AI Voice</Title>
          <Subtitle>
            Elevate your communication with next-generation AI technology.
            Seamless, intelligent, and natural conversations at your fingertips.
          </Subtitle>
        </MainSection>
  
        <FeatureSection>
          <FeatureGrid>
            <FeatureCard>
              <h3>Natural Intelligence</h3>
              <p>Advanced AI technology that understands context and nuance</p>
            </FeatureCard>
            <FeatureCard>
              <h3>Real-time Magic</h3>
              <p>Instant responses powered by cutting-edge GPT-4 technology</p>
            </FeatureCard>
            <FeatureCard>
              <h3>Human Touch</h3>
              <p>Natural voice synthesis that feels genuinely human</p>
            </FeatureCard>
          </FeatureGrid>
        </FeatureSection>
  
        <HighlightSection>
          <HighlightGrid>
            <HighlightContent>
              <h2>Revolutionary AI Communication</h2>
              <p>Experience the future of conversation with our state-of-the-art AI voice assistant. Powered by GPT-4 and advanced voice synthesis, creating natural, intelligent interactions that feel truly human.</p>
              <StatsGrid>
                <StatItem>
                  <h3>99.9%</h3>
                  <p>Response Accuracy</p>
                </StatItem>
                <StatItem>
                  <h3>0.1s</h3>
                  <p>Response Time</p>
                </StatItem>
                <StatItem>
                  <h3>24/7</h3>
                  <p>Availability</p>
                </StatItem>
                <StatItem>
                  <h3>100000+</h3>
                  <p>Use Cases</p>
                </StatItem>
              </StatsGrid>
            </HighlightContent>
            <ImageContainer />
          </HighlightGrid>
        </HighlightSection>
  
        <HighlightSection>
          <HighlightGrid>
            <ImageContainer />
            <HighlightContent>
              <h2>Enterprise-Grade Security</h2>
              <p>Your conversations are protected with high-grade encryption. Our AI assistant ensures complete privacy and security, making it perfect for sensitive business communications and personal matters.</p>
              <StatsGrid>
                <StatItem>
                  <h3>256-bit</h3>
                  <p>Encryption</p>
                </StatItem>
                <StatItem>
                  <h3>ISO 27001</h3>
                  <p>Certified</p>
                </StatItem>
              </StatsGrid>
            </HighlightContent>
          </HighlightGrid>
        </HighlightSection>
  
        <DemoSection>
          <DiscContainer>
            <Disc />
          </DiscContainer>
          <CallButton onClick={initiateCall} disabled={isLoading}>
            {isLoading ? 'Connecting...' : 'Experience Now'}
          </CallButton>
          <StatusText>{status}</StatusText>
        </DemoSection>
      </Container>
    );
}

export default App;

// Add these new animations after existing keyframes
const slideIn = keyframes`
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const marquee = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;

// Add these new styled components before the return statement
const TestimonialSection = styled.section`
  padding: 8rem 2rem;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  overflow: hidden;
`;

const TestimonialTrack = styled.div`
  display: flex;
  gap: 2rem;
  animation: ${marquee} 30s linear infinite;
  &:hover {
    animation-play-state: paused;
  }
`;

const TestimonialCard = styled.div`
  min-width: 400px;
  padding: 2.5rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    border-color: rgba(0, 163, 255, 0.3);
    transform: translateY(-5px);
  }

  blockquote {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #8892b0;
    margin-bottom: 1.5rem;
  }

  footer {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(45deg, #00a3ff, #00ff87);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
`;

const ClientInfo = styled.div`
  h4 {
    font-size: 1.1rem;
    color: white;
    margin-bottom: 0.2rem;
  }
  p {
    font-size: 0.9rem;
    color: #8892b0;
  }
`;

// Add this section in your return statement before the DemoSection
<TestimonialSection>
  <Title style={{ fontSize: '3rem', marginBottom: '4rem' }}>What Our Clients Say</Title>
  <TestimonialTrack>
    <TestimonialCard>
      <blockquote>
        "The AI voice assistant has transformed our customer service. The natural conversations and quick response times have significantly improved our customer satisfaction."
      </blockquote>
      <footer>
        <Avatar>JD</Avatar>
        <ClientInfo>
          <h4>John Doe</h4>
          <p>CEO, TechCorp</p>
        </ClientInfo>
      </footer>
    </TestimonialCard>

    <TestimonialCard>
      <blockquote>
        "Incredible technology! The AI's ability to understand context and provide relevant responses is remarkable. It's like having a human assistant available 24/7."
      </blockquote>
      <footer>
        <Avatar>SJ</Avatar>
        <ClientInfo>
          <h4>Sarah Johnson</h4>
          <p>CTO, Innovation Labs</p>
        </ClientInfo>
      </footer>
    </TestimonialCard>

    <TestimonialCard>
      <blockquote>
        "The enterprise-grade security features give us complete confidence in handling sensitive communications. This is exactly what we needed for our global operations."
      </blockquote>
      <footer>
        <Avatar>MR</Avatar>
        <ClientInfo>
          <h4>Michael Rodriguez</h4>
          <p>Security Director, Global Finance</p>
        </ClientInfo>
      </footer>
    </TestimonialCard>

    <TestimonialCard>
      <blockquote>
        "The voice synthesis quality is outstanding. Our clients can't tell they're talking to an AI. It's revolutionized our customer engagement strategy."
      </blockquote>
      <footer>
        <Avatar>EW</Avatar>
        <ClientInfo>
          <h4>Emma Wilson</h4>
          <p>Head of Customer Experience</p>
        </ClientInfo>
      </footer>
    </TestimonialCard>
  </TestimonialTrack>
</TestimonialSection>
