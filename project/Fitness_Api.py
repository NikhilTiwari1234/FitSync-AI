from flask import Flask, request, jsonify

app = Flask(_name_)

def calculate_calories(weight, height, age, gender, goal):
    weight, height, age = float(weight), float(height), int(age)
    if gender == "male":
        bmr = 10 * weight + 6.25 * height - 5 * age + 5
    else:
        bmr = 10 * weight + 6.25 * height - 5 * age - 161
    
    if goal == "weight_loss":
        return bmr - 500
    elif goal == "muscle_gain":
        return bmr + 500
    else:
        return bmr

def get_workout_plan(goal):
    plans = {
        "weight_loss": ["Cardio (30 mins)", "HIIT (20 mins)", "Strength Training (30 mins)"],
        "muscle_gain": ["Strength Training (45 mins)", "Compound Lifts", "Progressive Overload"],
        "maintenance": ["Balanced Workout (40 mins)", "Flexibility & Mobility", "Moderate Cardio"]
    }
    return plans.get(goal, [])

@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.json
    required_fields = ["weight", "height", "age", "gender", "goal"]
    
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required user data fields."}), 400
    
    calories = calculate_calories(data["weight"], data["height"], data["age"], data["gender"], data["goal"])
    workout_plan = get_workout_plan(data["goal"])
    
    recommendations = {
        "calories_needed": calories,
        "recommended_workout": workout_plan
    }
    
    return jsonify(recommendations)

if _name_ == "_main_":
    app.run(debug=True)