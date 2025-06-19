import { createSignal, onMount, Show } from "solid-js";
import "./mailer.css"; // Assuming you'll compile your Tailwind CSS into this file

const globalStyles = `
/* Custom Scrollbar Style for Webkit (Chrome, Safari) */
.custom-scrollbar::-webkit-scrollbar {
    width: 12px;
    height: 12px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: #f3f4f6; /* bg-gray-100 equivalent */
    border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #cbd5e1; /* A lighter gray/slate for subtlety */
    border-radius: 10px;
    border: 3px solid #f3f4f6; /* Border matches track */
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #94a3b8; /* Darker on hover */
}

/* Custom Scrollbar Style for Firefox */
.custom-scrollbar {
    scrollbar-width: thin; /* "auto" or "none" */
    scrollbar-color: #cbd5e1 #f3f4f6; /* thumb color track color */
}
`;

export function ComposeMailApp() {
  const [showCcBcc, setShowCcBcc] = createSignal(false);
  const [showImageInput, setShowImageInput] = createSignal(false);
  const [imageUrl, setImageUrl] = createSignal("");
  const [toRecipients, setToRecipients] = createSignal("");
  const [subject, setSubject] = createSignal("");
  const [emailBody, setEmailBody] = createSignal("");

  onMount(() => {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = globalStyles;
    document.head.appendChild(styleElement);
  });

  const handleToggleCcBcc = () => {
    setShowCcBcc(!showCcBcc());
  };

  const handleToggleImageInput = () => {
    setShowImageInput(!showImageInput());
    if (showImageInput()) {
      // Clear input when hiding
      setImageUrl("");
    }
  };

  const insertImage = () => {
    if (imageUrl()) {
      // In a real HTML email, you'd want more careful handling of <img> tags.
      // For this static preview, we'll just append it to the textarea.
      // For a true rich text experience, this would manipulate contentEditable.
      setEmailBody(
        (prev) =>
          prev +
          `\n<img src="${imageUrl()}" alt="Embedded Image" style="max-width:100%; height:auto; display:block; margin: 10px 0;">\n`
      );
      setImageUrl(""); // Clear input
      setShowImageInput(false); // Hide input again
    } else {
      alert("Please enter an image URL.");
    }
  };

  const sendEmail = () => {
    alert(
      "Email sending functionality is not implemented in this static page. It requires server-side code."
    );
    // In a real application, you'd collect values from all input fields (to, cc, bcc, subject, body)
    // and send them to a backend server.
    console.log("To:", toRecipients());
    console.log("Subject:", subject());
    console.log("Body:", emailBody());
    console.log("Image URL:", imageUrl());
  };

  const discardEmail = () => {
    if (confirm("Are you sure you want to discard this email?")) {
      setToRecipients("");
      setSubject("");
      setEmailBody("");
      setImageUrl("");
      setShowImageInput(false);
      setShowCcBcc(false); // Also clear cc/bcc visibility
      alert("Email discarded.");
    }
  };

  return (
    <div class="bg-gray-50 text-gray-800 font-sans min-h-screen flex items-center justify-center p-4">
      <div class="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col min-h-[80vh] md:min-h-[90vh]">
        {/* Header */}
        <div class="flex items-center justify-between p-5 border-b border-gray-200 bg-white">
          <h1 class="text-2xl font-bold text-gray-900">New Message</h1>
          <div class="flex space-x-3">
            <button
              class="text-gray-500 hover:text-gray-700 transition-colors duration-200"
              title="Minimize"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <button
              class="text-gray-500 hover:text-gray-700 transition-colors duration-200"
              title="Fullscreen"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm10 2H7v6h6V7z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <button
              class="text-gray-500 hover:text-red-500 transition-colors duration-200"
              title="Close"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Form Fields and Editor */}
        <div class="flex-1 flex flex-col p-6 space-y-4 overflow-y-auto custom-scrollbar">
          <div class="border-b border-gray-200 pb-2">
            <div class="flex items-center group">
              <label
                for="to-recipients"
                class="text-gray-600 font-medium w-12 flex-shrink-0"
              >
                To:
              </label>
              <input
                type="text"
                id="to-recipients"
                placeholder="Recipients (comma-separated)"
                class="flex-1 p-2 focus:outline-none focus:ring-0 text-gray-800 bg-transparent"
                value={toRecipients()}
                onInput={(e) => setToRecipients(e.target.value)}
                multiple
              />
              <button
                onClick={handleToggleCcBcc}
                class="text-blue-500 text-sm font-semibold ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                Cc/Bcc
              </button>
            </div>
          </div>

          <Show when={showCcBcc()}>
            <div class="border-b border-gray-200 pb-2">
              <div class="flex items-center">
                <label
                  for="cc-recipients"
                  class="text-gray-600 font-medium w-12 flex-shrink-0"
                >
                  Cc:
                </label>
                <input
                  type="text"
                  id="cc-recipients"
                  class="flex-1 p-2 focus:outline-none focus:ring-0 text-gray-800 bg-transparent"
                />
              </div>
            </div>
            <div class="border-b border-gray-200 pb-2">
              <div class="flex items-center">
                <label
                  for="bcc-recipients"
                  class="text-gray-600 font-medium w-12 flex-shrink-0"
                >
                  Bcc:
                </label>
                <input
                  type="text"
                  id="bcc-recipients"
                  class="flex-1 p-2 focus:outline-none focus:ring-0 text-gray-800 bg-transparent"
                />
              </div>
            </div>
          </Show>

          <div class="border-b border-gray-200 pb-2">
            <div class="flex items-center">
              <label
                for="subject"
                class="text-gray-600 font-medium w-12 flex-shrink-0"
              >
                Subject:
              </label>
              <input
                type="text"
                id="subject"
                class="flex-1 p-2 focus:outline-none focus:ring-0 text-gray-800 bg-transparent"
                placeholder="Enter subject here"
                value={subject()}
                onInput={(e) => setSubject(e.target.value)}
              />
            </div>
          </div>

          <div class="flex-1 min-h-[200px] border border-gray-200 rounded-lg p-4 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-200 transition-shadow duration-200 flex flex-col">
            <div class="flex items-center space-x-3 text-gray-500 mb-3 border-b border-gray-200 pb-2">
              <button title="Bold" class="p-1 rounded hover:bg-gray-200">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M6 2a1 1 0 00-1 1v14a1 1 0 001 1h8a1 1 0 001-1V3a1 1 0 00-1-1H6zm2 2h4v12H8V4zm0 0a2 2 0 114 0h-4zm0 12a2 2 0 114 0h-4z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <button title="Italic" class="p-1 rounded hover:bg-gray-200">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M10 2a1 1 0 00-.707.293L4 7.586V7a1 1 0 10-2 0v10a1 1 0 102 0v-2.586l5.293 5.293A1 1 0 0011 18a1 1 0 00.707-.293L18 10.414V11a1 1 0 102 0V2a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <button title="Underline" class="p-1 rounded hover:bg-gray-200">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M3 13a1 1 0 001 1h12a1 1 0 100-2H4a1 1 0 00-1 1zm0 2a1 1 0 001 1h12a1 1 0 100-2H4a1 1 0 00-1 1zm0-4a1 1 0 001 1h12a1 1 0 100-2H4a1 1 0 00-1 1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <button title="Link" class="p-1 rounded hover:bg-gray-200">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H7a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <button title="Quote" class="p-1 rounded hover:bg-gray-200">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M7 2a1 1 0 00-1 1v14a1 1 0 001 1h6a1 1 0 001-1V3a1 1 0 00-1-1H7zm1 3a1 1 0 00-1 1v2a1 1 0 001 1h4a1 1 0 001-1V6a1 1 0 00-1-1H8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <button title="List" class="p-1 rounded hover:bg-gray-200">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <textarea
              id="email-body"
              class="flex-1 w-full p-2 bg-gray-50 focus:outline-none resize-none custom-scrollbar text-gray-700 placeholder-gray-400"
              placeholder="Write your message..."
              value={emailBody()}
              onInput={(e) => setEmailBody(e.target.value)}
            ></textarea>
          </div>

          <div class="flex items-center justify-between pt-4 border-t border-gray-200">
            <div class="flex items-center space-x-4">
              <button class="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors duration-200 font-semibold">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span>Attach File</span>
              </button>
              <button
                onClick={handleToggleImageInput}
                class="flex items-center space-x-2 px-4 py-2 bg-teal-100 text-teal-700 rounded-full hover:bg-teal-200 transition-colors duration-200 font-semibold"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-4 2 2 6-6V5h2v6.586l-2.707 2.707z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span>Add Image</span>
              </button>
            </div>
            <Show when={showImageInput()}>
              <div class="flex items-center space-x-2">
                <input
                  type="url"
                  id="image-url-input"
                  placeholder="Paste image URL here"
                  class="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-700 w-64"
                  value={imageUrl()}
                  onInput={(e) => setImageUrl(e.target.value)}
                />
                <button
                  onClick={insertImage}
                  class="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                >
                  Insert
                </button>
              </div>
            </Show>
          </div>
        </div>

        {/* Footer Buttons */}
        <div class="p-5 border-t border-gray-200 flex justify-end space-x-4 bg-white">
          <button
            onClick={sendEmail}
            class="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg text-white font-semibold shadow-md hover:from-blue-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l.608-.246A7.994 7.994 0 0110 16a7.994 7.994 0 015.312 2.622l.608.246a1 1 0 001.169-1.409l-7-14z"></path>
            </svg>
            <span>Send</span>
          </button>
          <button
            onClick={discardEmail}
            class="flex items-center space-x-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200 transform hover:scale-105"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm1 3a1 1 0 000 2h4a1 1 0 100-2H8z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span>Discard</span>
          </button>
        </div>
      </div>
    </div>
  );
}
