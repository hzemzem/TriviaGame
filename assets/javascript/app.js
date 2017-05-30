$(document).ready(function() {

		function initialScreen() {
			startScreen = "<p class='text-center main-button-container'><a class='btn btn-warning btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
			$(".mainArea").html(startScreen);
		}

		initialScreen();


		

		$("body").on("click", ".start-button", function(event){
			event.preventDefault();  // added line to test issue on GitHub Viewer
			generateHTML();

			timerWrapper();

		}); 

		$("body").on("click", ".answer", function(event){
			selectedAnswer = $(this).text();
			if(selectedAnswer === correctAnswers[questionCounter]) {

				clearInterval(theClock);
				generateWin();
			}
			else {
				clearInterval(theClock);
				generateLoss();
			}
		}); 

		$("body").on("click", ".reset-button", function(event){
			resetGame();
		}); 

		});  

		function generateLossDueToTimeOut() {
			unansweredTally++;
			gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
			$(".mainArea").html(gameHTML);
			setTimeout(wait, 4000);  
		}

		function generateWin() {
			correctTally++;
			gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
			$(".mainArea").html(gameHTML);
			setTimeout(wait, 4000);  
		}

		function generateLoss() {
			incorrectTally++;
			gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + wrongImageArray[questionCounter];
			$(".mainArea").html(gameHTML);
			setTimeout(wait, 4000); 
		}

		function generateHTML() {
			gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
			$(".mainArea").html(gameHTML);
			soundTrack.play();
		}

		function wait() {
			if (questionCounter < 7) {
			questionCounter++;
			generateHTML();
			counter = 30;
			timerWrapper();
			}
			else {
				finalScreen();
			}
		}

		function timerWrapper() {
			theClock = setInterval(thirtySeconds, 1000);
			function thirtySeconds() {
				if (counter === 0) {
					clearInterval(theClock);
					generateLossDueToTimeOut();
				}
				if (counter > 0) {
					counter--;
				}
				$(".timer").html(counter);
			}
		}

		function finalScreen() {
			gameHTML = "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-warning btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
			$(".mainArea").html(gameHTML);
		}

		function resetGame() {
			questionCounter = 0;
			correctTally = 0;
			incorrectTally = 0;
			unansweredTally = 0;
			counter = 30;
			generateHTML();
			timerWrapper();
		}

		var startScreen;
		var gameHTML;
		var counter = 30;
		var questionArray = ["Who is the last character seen in the series finale?", "What movie, after the gang saw it, made Kelso obsessed with it?", "According to Hyde, what are the three branches of the government?", "Who is the oldest member of the gang?", "What type of car does Leo give Hyde?", "What was Donna's gift to Eric before he left to Africa?", "What did Eric say back to Donna after she said I love you?", "Who is Kelso afraid of on the camping trip before graduation?"];
		var answerArray = [["Michael Kelso", "Fez", "Jackie Burkhart", "Eric Forman"], ["Casablanca","Star Wars","Dirty Harry","Magnum Force"], ["Corporate, legislative, and Judicial", "Military, Executive, and Hollywood", "Military, Corporate, and Hollywood.", "Military, Hollywood, and Law"], ["Steven Hyde","Donna Pinciotti","Michael Kelso","Eric Forman"], ["Ford Mustang II", "Pontiac Firebird", "Corvette", "El Camino"], ["Star Wars role play/She dressed as Leia.","A Fancy Pen.","A Scented Candle","A Cassette Player"], ["I love you, too.", "I love Cake.", "I don't love you, sorry.", "We're just friends."], ["Ghosts.","Big Bears.","His girlfriend, Jackie.","The Lady of the Lake."]];
		var imageArray = ["<img class='center-block img-right' src='assets/images/win1.gif'>", "<img class='center-block img-right' src='assets/images/win3.gif'>", "<img class='center-block img-right' src='assets/images/win2.gif'>", "<img class='center-block img-right' src='assets/images/win4.gif'>", "<img class='center-block img-right' src='assets/images/win6.gif'>", "<img class='center-block img-right' src='assets/images/win5.gif'>", "<img class='center-block img-right' src='assets/images/win1.gif'>", "<img class='center-block img-right' src='assets/images/win2.gif'>"];
		var wrongImageArray = ["<img class='center-block img-right' src='assets/images/lose1.gif'>", "<img class='center-block img-right' src='assets/images/lose3.gif'>", "<img class='center-block img-right' src='assets/images/lose2.gif'>", "<img class='center-block img-right' src='assets/images/lose4.gif'>", "<img class='center-block img-right' src='assets/images/lose6.gif'>", "<img class='center-block img-right' src='assets/images/lose5.gif-c200'>", "<img class='center-block img-right' src='assets/images/lose7.gif'>", "<img class='center-block img-right' src='assets/images/lose2.gif'>"];
		var correctAnswers = ["A. Michael Kelso", "B. Star Wars", "C. Military, Corporate, and Hollywood.", "C. Michael Kelso", "D. El Camino", "A. Star Wars role play/She dressed as Leia.", "B. I love Cake.", "D. The Lady of the Lake."];
		var questionCounter = 0;
		var selecterAnswer;
		var theClock;
		var correctTally = 0;
		var incorrectTally = 0;
		var unansweredTally = 0;
		var soundTrack = new Audio("assets/sounds/soundtrack.mp3");