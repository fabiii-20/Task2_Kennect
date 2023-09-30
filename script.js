document.addEventListener("DOMContentLoaded", function () {
    const startInput = document.getElementById("start");
    const endInput = document.getElementById("end");
    const getPrimesInRange = (start, end) => {
      const primes = [];
      for (let i = start; i <= end; i++) {
        if (isPrime(i)) {
          primes.push(i);
        }
      }
      return primes;
    }
    const isPrime = (num) => {
      if (num <= 1) {
        return false;
      }
      if (num <= 3) {
        return true;
      }
      if (num % 2 === 0 || num % 3 === 0) {
        return false;
      }
      for (let i = 5; i * i <= num; i = i + 6) {
        if (num % i === 0 || num % (i + 2) === 0) {
          return false;
        }
      }
      return true;
    }
    const calculateButton = document.getElementById("calculate");
    const primeCountSpan = document.getElementById("primeCount");
    const detailsButton = document.getElementById("details");
    const detailsModal = document.getElementById("detailsModal");
    const timeToCalculate = document.getElementById("timeToCalculate");
    const timeToCheckSingle = document.getElementById("timeToCheckSingle");
    const averageTime = document.getElementById("averageTime");
  
    calculateButton.addEventListener("click", function () {
      const start = parseInt(startInput.value);
      const end = parseInt(endInput.value);
  
      if (!isNaN(start) && !isNaN(end) && start <= end) {
        const startTime = performance.now();
        const primes = getPrimesInRange(start, end);
        const endTime = performance.now();
  
        const timeTaken = endTime - startTime;
  
        primeCountSpan.textContent = primes.length;
        timeToCalculate.textContent = timeTaken.toFixed(2) + " ms";
  
        // Calculate time to check a single number
        const singleCheckTime = calculateSingleCheckTime();
        timeToCheckSingle.textContent = singleCheckTime.toFixed(2) + " ms";
  
        // Calculate average time to check a prime
        const averagePrimeCheckTime = calculateAveragePrimeCheckTime(primes);
        averageTime.textContent = averagePrimeCheckTime.toFixed(2) + " ms";
  
        // Show the modal
        detailsModal.style.display = "block";
      }
    });
  
    detailsButton.addEventListener("click", function () {
      detailsModal.style.display = "block";
    });
  
    detailsModal.querySelector(".close").addEventListener("click", function () {
      detailsModal.style.display = "none";
    });
  
    window.addEventListener("click", function (e) {
      if (e.target == detailsModal) {
        detailsModal.style.display = "none";
      }
    });
  
    function calculateSingleCheckTime() {
      const numToCheck = 97; // Example number to check
      const startTime = performance.now();
      isPrime(numToCheck);
      const endTime = performance.now();
      return endTime - startTime;
    }
  
    function calculateAveragePrimeCheckTime(primes) {
      let totalTime = 0;
  
      for (let i = 0; i < primes.length; i++) {
        const startTime = performance.now();
        isPrime(primes[i]);
        const endTime = performance.now();
        totalTime += endTime - startTime;
      }
  
      return totalTime / primes.length;
    }
  });
   