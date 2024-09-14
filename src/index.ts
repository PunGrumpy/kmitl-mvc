import cors from '@elysiajs/cors'
import { html } from '@elysiajs/html'
import swagger from '@elysiajs/swagger'
import { Elysia } from 'elysia'
import logixlysia from 'logixlysia'

import { CowController } from '@/src/controllers/CowController'

const app = new Elysia()
  .use(
    logixlysia({
      config: {
        showBanner: true,
        ip: true
      }
    })
  )
  .use(html())
  .use(
    swagger({
      path: '/docs',
      documentation: {
        info: {
          title: 'KMITL Exit Exam API',
          version: '1.0.0'
        },
        tags: [
          {
            name: 'Cow',
            description: 'Cow Management'
          },
          {
            name: 'Milk',
            description: 'Milk Management'
          }
        ]
      }
    })
  )
  .get(
    '/',
    () => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Cow Milk Management</title>
      <script src="https://unpkg.com/htmx.org@1.9.6"></script>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
        body {
          font-family: 'Poppins', sans-serif;
          background-color: #f7fafc;
        }
        .container {
          max-width: 800px;
        }
      </style>
    </head>
    <body class="bg-gray-50 text-gray-800">
      <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-semibold text-center mb-8 text-indigo-600">Cow Milk Management</h1>
        
        <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 class="text-xl font-medium mb-4">Add New Cow</h2>
          <form hx-post="/api/cows" hx-target="#cow-list" hx-swap="afterbegin" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1" for="code">Cow Code</label>
                <input type="text" id="code" name="code" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  pattern="^[1-9][0-9]{7}$" title="Please enter an 8-digit number not starting with 0">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1" for="color">Color</label>
                <select id="color" name="color" required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="white">White</option>
                  <option value="brown">Brown</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1" for="age">Age (Years)</label>
                <input type="number" id="age" name="age" required min="0" max="10"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1" for="ageMonths">Age (Months)</label>
                <input type="number" id="ageMonths" name="ageMonths" required min="0" max="11"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
              </div>
            </div>
            <div class="flex justify-end">
              <button type="submit"
                class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out">
                Add Cow
              </button>
            </div>
          </form>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 class="text-xl font-medium mb-4">Find Cow</h2>
          <form hx-get="/api/cows" hx-target="#cow-info" class="flex items-center">
            <input type="text" name="code" required
              class="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mr-2"
              pattern="^[1-9][0-9]{7}$" title="Please enter an 8-digit number not starting with 0"
              placeholder="Enter Cow Code">
            <button type="submit"
              class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out">
              Find Cow
            </button>
          </form>
        </div>

        <div id="cow-info" class="mb-8"></div>

        <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 class="text-xl font-medium mb-4">Cow List</h2>
          <div id="cow-list" hx-get="/api/cows" hx-trigger="load"></div>
        </div>

        <div class="text-center mb-8">
          <button hx-post="/api/cows/reset-bsod" hx-target="#cow-list"
            class="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition duration-150 ease-in-out">
            Reset All BSOD
          </button>
        </div>

        <div id="milk-report" hx-get="/api/milk/report" hx-trigger="load, every 5s" class="bg-white rounded-lg shadow-sm p-6"></div>
      </div>

      <script>
        document.body.addEventListener('htmx:afterSwap', function(event) {
          if (event.detail.target.id === 'cow-info' || event.detail.target.id === 'cow-list') {
            const cowInfo = event.detail.target;
            const addLemonButtons = cowInfo.querySelectorAll('.add-lemon-button');
            const milkButtons = cowInfo.querySelectorAll('.milk-button');
            
            addLemonButtons.forEach((addLemonButton) => {
              addLemonButton.addEventListener('click', function(e) {
                e.preventDefault();
                const cowCode = this.getAttribute('data-cow-code');
                if (cowCode && /^[1-9][0-9]{7}$/.test(cowCode)) {
                  this.setAttribute('hx-post', '/api/cows/' + cowCode + '/add-lemon');
                  this.setAttribute('hx-target', 'closest .cow-info');
                  this.setAttribute('hx-swap', 'outerHTML');
                  htmx.trigger(this, 'click');
                } else {
                  console.error('Invalid cow code:', cowCode);
                }
              });
            });

            milkButtons.forEach((milkButton) => {
              milkButton.addEventListener('click', function() {
                this.disabled = true;
                this.classList.add('opacity-50', 'cursor-not-allowed');
                setTimeout(() => {
                  this.disabled = false;
                  this.classList.remove('opacity-50', 'cursor-not-allowed');
                }, 2000);
              });
            });
          }
        });
      </script>
    </body>
    </html>
  `
  )
  .use(cors())
  .listen(3000)

// Register the Route
app.use(CowController)
