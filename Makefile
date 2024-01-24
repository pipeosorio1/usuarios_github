up:
	yarn native-android --verbose

up-ios:
	yarn native-ios --verbose

gen-apk:
	npx react-native run-android --mode release

clean-gradlew:
	cd android && ./gradlew clean && cd ..