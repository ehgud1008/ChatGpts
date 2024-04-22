import React, { useState } from 'react';

const Main = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isSidebar, setIsSidebar] = useState(false);

  const sendNewMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, newMessage.trim()]);
      setNewMessage('');
    }
  };

  return (
    <div class="flex h-screen">
        {/* <!-- Sidebar --> */}
        {isSidebar && (
          <div class="w-2/12 px-8 py-4 bg-white border-r">
              <h1 class="text-lg font-semibold">ChatGPT 4</h1>
              <ul class="mt-8">
                  <li class="mb-4 active-link p-2">Explore GPTs</li>
                  <li class="mb-4 p-2">DesignerGPT</li>
                  <li class="mb-4 p-2">Image Generator</li>
                  <li class="mb-4 p-2">Video Maker</li>
                  <li class="mb-4 p-2">More Tools</li>
              </ul>
          </div>
        )}

        {/* <!-- Main content --> */}
        <div class="flex-1 p-10">
            <h2 class="text-2xl font-bold mb-6">How can I help you today?</h2>
            <div class="grid grid-cols-3 gap-4">
                <div class="card p-4 bg-white border rounded-lg">
                    <h3 class="font-semibold">Suggest fun activities</h3>
                    <p>Help me make friends in a new city</p>
                </div>
                <div class="card p-4 bg-white border rounded-lg">
                    <h3 class="font-semibold">Recommend a dish</h3>
                    <p>Bring to a potluck</p>
                </div>
                <div class="card p-4 bg-white border rounded-lg">
                    <h3 class="font-semibold">Plan an itinerary</h3>
                    <p>Fashion-focused exploration of Paris</p>
                </div>
            </div>
            {/* <!-- Footer --> */}
            <div class="absolute right-0 bottom-0 w-10/12 bg-gray-100 p-4">
                <div class="flex justify-between items-center">
                    <input type="text" placeholder="Message ChatGPT..." class="p-2 w-full border rounded-lg" />
                    <button class="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg">Send</button>
                </div>
            </div>
        </div>

    </div>
  );
};

export default Main;
