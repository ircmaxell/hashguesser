(function(angular, sjcl) {
    var hashes = [
        {
            "oracles":[{"password":"password","salt":"abcdefghijklmnopqrstuvwxyz012345","hash":"2b5e3e2fae2b593be1e893969e1524ad"},{"password":"password","salt":"saltsaltsaltsaltsaltsaltsaltsalt","hash":"b4728716ee1a8de5fe3ce43646ff4973"},{"password":"apple","salt":"pearpearpearpearpearpearpearpear","hash":"492e1a6f7f64f6b8e8a9552162636edf"},{"password":"apple","salt":"orangeorangeorangeorangeorangeor","hash":"46dd3160118941ca6b8b041b76b10f70"}],
            "test":{"password":"foo","salt":"barbarbarbarbarbarbarbarbarbarba","hash":"06f28b94369f3e6f86b8e8cc8da683dfe6fe1778f09e3dfc2a8ea6a22dd5b3e6"},
            "hint": "If you can't get this one without a hint..."
        },
        {
            "oracles":[{"password":"password","salt":"abcdefghijklmnopqrstuvwxyz012345","hash":"90f628bde8d89d21a3b8bb41524fade71624a123"},{"password":"password","salt":"saltsaltsaltsaltsaltsaltsaltsalt","hash":"2e4fd1f0d9533ecfde2df2827db7f828d93a7d98"},{"password":"apple","salt":"pearpearpearpearpearpearpearpear","hash":"10a4f14c6405d7aaede79941755d872c21df2af8"},{"password":"apple","salt":"orangeorangeorangeorangeorangeor","hash":"0d4ee5820c24d360f23e61e5c9012594a27076a3"}],
            "test":{"password":"foo","salt":"barbarbarbarbarbarbarbarbarbarba","hash":"c3ae5e12ba15a3349d58659cf59b28c561b0a124b22e26946098d6ee2f75029d"},
            "hint": "Combinations are required."
        },
        {
            "oracles":[{"password":"password","salt":"abcdefghijklmnopqrstuvwxyz012345","hash":"535ee2f3dfdb60d5bc5f76987ced05a7516fd7b9375a539d87e7a5feca7e146120a5463f087ec9a8"},{"password":"password","salt":"saltsaltsaltsaltsaltsaltsaltsalt","hash":"7e2a6daed64f8aab57e9547e9ece7926adcdcba75d2e01eff54b4f73da0951b7ceaec0891df9322f"},{"password":"apple","salt":"pearpearpearpearpearpearpearpear","hash":"111fea8925aa7013f0044b388b36b97ac308202e3489e6a0db7142faabb77ee115046b348d64d3fa"},{"password":"apple","salt":"orangeorangeorangeorangeorangeor","hash":"2307bf6814a9295dd0147198ecc42a1680d7cd35967fbd7ee841a2bf1b67d0db94798224af667b41"}],
            "test":{"password":"foo","salt":"barbarbarbarbarbarbarbarbarbarba","hash":"9846fdd1e033237cd7d85226b393f3bcf94455d2a8b79b8c058901b8215e5725"},
            "hint": "You'll need to think in an alternate way to get this one."
        },
        {
            "oracles":[{"password":"password","salt":"abcdefghijklmnopqrstuvwxyz012345","hash":"b2cfd14889a6a26066c49f7484911cab"},{"password":"password","salt":"saltsaltsaltsaltsaltsaltsaltsalt","hash":"8f9123f4c1561d550017dd807bc165f8"},{"password":"apple","salt":"pearpearpearpearpearpearpearpear","hash":"a2b5b23d1169ca30cd3ab4f5d408f02e"},{"password":"apple","salt":"orangeorangeorangeorangeorangeor","hash":"9450d70573c819010cfeaa1c8c9200b7"}],
            "test":{"password":"foo","salt":"barbarbarbarbarbarbarbarbarbarba","hash":"7ff5cbaffc21324cdf00d796cdf4d49e94ffdfd7124c356b31f542ec0b1f6bbf"},
            "hint": "There's something cryptic about what's going on here..."
        },
        {
            "oracles":[{"password":"password","salt":"abcdefghijklmnopqrstuvwxyz012345","hash":"$2a$07$usesomesillystringforemUFsKduCdorWGPSNWMxzm\/Z3Z8NpF6q"},{"password":"password","salt":"saltsaltsaltsaltsaltsaltsaltsalt","hash":"$2a$07$usesomesillystringforeplj1BpYrVN3saXpuuhVAZhM4pkKwvby"},{"password":"apple","salt":"pearpearpearpearpearpearpearpear","hash":"$2a$07$usesomesillystringfore4GMbp487k\/vn80kyTmV9E1EH29RPnNO"},{"password":"apple","salt":"orangeorangeorangeorangeorangeor","hash":"$2a$07$usesomesillystringforeYHE0pveF5POmVJyE49bxCBLo8hboZ.C"}],
            "test":{"password":"foo","salt":"barbarbarbarbarbarbarbarbarbarba","hash":"e81605e5c8f354dc7bd3b18cbfda2efc436d83d98cd7610eb9a5fe034c505942"},
            "hint": "You'll want to look to another answer for the key here..."
        },
        {
            "oracles":[{"password":"password","salt":"abcdefghijklmnopqrstuvwxyz012345","hash":"ughE8Ev8uGFaUgY2cNEySvxngrbJzdmughE8Ev8uGFaUgY2cNEySvxngrbJzdm00"},{"password":"password","salt":"saltsaltsaltsaltsaltsaltsaltsalt","hash":"Oh9rCgsOi8IYqmtEm1s6duinLpzU3BbaOh9rCgsOi8IYqmtEm1s6duinLpzU3Bba"},{"password":"apple","salt":"pearpearpearpearpearpearpearpear","hash":"eruF4cZLPY53MB2dWzC27T21eNzyZ0KeruF4cZLPY53MB2dWzC27T21eNzyZ0K00"},{"password":"apple","salt":"orangeorangeorangeorangeorangeor","hash":"et9rn296WCCymrITy2fWknsf4rAIoBZWet9rn296WCCymrITy2fWknsf4rAIoBZW"}],
            "test":{"password":"foo","salt":"barbarbarbarbarbarbarbarbarbarba","hash":"d3cfa4af21cccd1804be3a762215d3237e8b6191558ebf39cdea59fc9931bd43"},
            "hint": "Something is stripped from this hash (and something else is doubled)"
        },
        {
            "oracles":[{"password":"password","salt":"abcdefghijklmnopqrstuvwxyz012345","hash":"p3nnqoo9p9038p127q74q62175222rp30rs11spn8s1q608o31s8791rs788n578"},{"password":"password","salt":"saltsaltsaltsaltsaltsaltsaltsalt","hash":"22s27r9r71o71448088p73q141767os94pnrp3psnno0o469r1no4515pqq76927"},{"password":"apple","salt":"pearpearpearpearpearpearpearpear","hash":"8snn890285nr70o4086qoos3433r400nr274601r8o36qrq73194875817nq1rqp"},{"password":"apple","salt":"orangeorangeorangeorangeorangeor","hash":"q86r26rq32973oo1o1ss2srqp73ns68s5q2076n24679o5pps2873nr63r9p3qpq"}],
            "test":{"password":"foo","salt":"barbarbarbarbarbarbarbarbarbarba","hash":"57f542129a886ada2891ceb55c56e2d2f48e5218d739b08578925baf89ea6668"},
            "hint": "Look at the pattern of characters. I wonder if there's something to that...?"
        },
        {
            "oracles":[{"password":"password","salt":"abcdefghijklmnopqrstuvwxyz012345","hash":"770e2462f54beb656730f4c93ab18b4f"},{"password":"password","salt":"saltsaltsaltsaltsaltsaltsaltsalt","hash":"fe09ad3a5ab1a35538df5214fc21d2aa"},{"password":"apple","salt":"pearpearpearpearpearpearpearpear","hash":"b137e75e44f26857a6ded9ce24cd0f41"},{"password":"apple","salt":"orangeorangeorangeorangeorangeor","hash":"bc92bb85a4b8f9c94039fc47304223c8"}],
            "test":{"password":"foo","salt":"barbarbarbarbarbarbarbarbarbarba","hash":"b86334f1d9bb7ab3fd5bd0e37e3425d956626f53e30b942831bb7cf756a72d79"},
            "hint": "Google is your only hope... Or not. Either way, you'll have to get creative..."
        },
        {
            "oracles":[{"password":"password","salt":"abcdefghijklmnopqrstuvwxyz012345","hash":"92efeff958c88194ad0b983eed21ce90"},{"password":"password","salt":"saltsaltsaltsaltsaltsaltsaltsalt","hash":"92efeff958c88194ad0b983eed21ce90"},{"password":"apple","salt":"pearpearpearpearpearpearpearpear","hash":"65f9d5a8f985f5413175d97e9cc51891"},{"password":"apple","salt":"orangeorangeorangeorangeorangeor","hash":"65f9d5a8f985f5413175d97e9cc51891"}],
            "test":{"password":"foo","salt":"barbarbarbarbarbarbarbarbarbarba","hash":"75727b4488af0ec6e9dea105278209c2c713c749fc193dc53dd1f6f94527c7f8"},
            "hint": "You'll have to combine algorithms in the right order for this one..."
        },
        {
            "oracles":[{"password":"password","salt":"abcdefghijklmnopqrstuvwxyz012345","hash":"ec9a444c55a2377232505df2ea9491136ddafa478905076abd741922e6d3e71e"},{"password":"password","salt":"saltsaltsaltsaltsaltsaltsaltsalt","hash":"16f0dc6bd83699efa2d1c1e7865a5dab1838a2cbda0188f2354c9cde9b9ee129"},{"password":"apple","salt":"pearpearpearpearpearpearpearpear","hash":"8e5e856bd5eca66fa45b935e0d3e63226b071b738d64e831484c890e35ef9b4c"},{"password":"apple","salt":"orangeorangeorangeorangeorangeor","hash":"e74d2ed85db1c2b1ad1ed9cd7e79548861dfaa03c5571cfc846c6b0f54da8900"}],
            "test":{"password":"foo","salt":"barbarbarbarbarbarbarbarbarbarba","hash":"7c81fc38a351dc14f94dad9fd7db8fff6392dfc2d39b3f3bb926cfc8da2344f6"},
            "hint": "HASH ALL THE THINGS!!!"
        },
        {
            "oracles":[{"password":"password","salt":"abcdefghijklmnopqrstuvwxyz012345","hash":"3294527883"},{"password":"password","salt":"saltsaltsaltsaltsaltsaltsaltsalt","hash":"3796677028"},{"password":"apple","salt":"pearpearpearpearpearpearpearpear","hash":"1514252925"},{"password":"apple","salt":"orangeorangeorangeorangeorangeor","hash":"3083570116"}],
            "test":{"password":"foo","salt":"barbarbarbarbarbarbarbarbarbarba","hash":"48c85d4b68a297d743d0a745d0ee7d9e376f1f90c22b12c9083bf3df67ddf97a"},
            "hint": "Think about the 'other' definition of 'hash'..."
        },
        {
            "oracles":[{"password":"password","salt":"abcdefghijklmnopqrstuvwxyz012345","hash":"5f4dcc3b5aa765d61d8327deb882cf995baa61e4c9b93f3f0682250b6cf8331b7ee68fd8"},{"password":"password","salt":"saltsaltsaltsaltsaltsaltsaltsalt","hash":"5f4dcc3b5aa765d61d8327deb882cf995baa61e4c9b93f3f0682250b6cf8331b7ee68fd8"},{"password":"apple","salt":"pearpearpearpearpearpearpearpear","hash":"1f3870be274f6c49b3e31a0c6728957fd0be2dc421be4fcd0172e5afceea3970e2f3d940"},{"password":"apple","salt":"orangeorangeorangeorangeorangeor","hash":"1f3870be274f6c49b3e31a0c6728957fd0be2dc421be4fcd0172e5afceea3970e2f3d940"}],
            "test":{"password":"foo","salt":"barbarbarbarbarbarbarbarbarbarba","hash":"77dc6b529bc03439c73a433a7de8b2021ddf1ce51a03673ff03b1653b361a8d7"},
            "hint": "If you need a hint for this one..."
        },
        {
            "oracles":[{"password":"password","salt":"abcdefghijklmnopqrstuvwxyz012345","hash":"cnffjbeq"},{"password":"password","salt":"saltsaltsaltsaltsaltsaltsaltsalt","hash":"cnffjbeq"},{"password":"apple","salt":"pearpearpearpearpearpearpearpear","hash":"nccyr"},{"password":"apple","salt":"orangeorangeorangeorangeorangeor","hash":"nccyr"}],
            "test":{"password":"foo","salt":"barbarbarbarbarbarbarbarbarbarba","hash":"5ced5da8293eb4f6ec1fed952f2a1ec7140c07ca6a748d58653107c07a66b797"},
            "hint": "You'll need to talk to an ancient Roman for this one..."
        },
        {
            "oracles":[{"password":"password","salt":"abcdefghijklmnopqrstuvwxyz012345","hash":"110310171209150c"},{"password":"password","salt":"saltsaltsaltsaltsaltsaltsaltsalt","hash":"03001f07040e1e10"},{"password":"apple","salt":"pearpearpearpearpearpearpearpear","hash":"1115111e15"},{"password":"apple","salt":"orangeorangeorangeorangeorangeor","hash":"0e02110202"}],
            "test":{"password":"foo","salt":"barbarbarbarbarbarbarbarbarbarba","hash":"4d3aebd56d1ac8c6aaad781c398c0e17b49451a092e8f3f133eb5c2f7d85c170"},
            "hint": "Cryptographers should get this one with no problem..."
        },
        {
            "oracles":[{"password":"password","salt":"abcdefghijklmnopqrstuvwxyz012345","hash":"33643869386b396e6a6f3d6e424742727643784c4e49504e527f4c514f528084"},{"password":"password","salt":"saltsaltsaltsaltsaltsaltsaltsalt","hash":"63363a363d3d383e6e6f3c6d45727445777746777a4a4a4e4d50818251575653"},{"password":"apple","salt":"pearpearpearpearpearpearpearpear","hash":"353b356936673d6e4070414073447148764a744d4a4b49494f4c514f53838386"},{"password":"apple","salt":"orangeorangeorangeorangeorangeor","hash":"3538676838373d383a3b4345413f727147744b76454a487a50507d4d4d845650"}],
            "test":{"password":"foo","salt":"barbarbarbarbarbarbarbarbarbarba","hash":"b9b5fc79f423ab2a24e04f297ce1d17a2d03fa116827676f2da6540423e5066d"},
            "hint": "There's something shifty going on here..."
        }
    ];

    var hashApp = angular.module("hashApp", []);

    hashApp.directive("hashGuess", function() {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function(viewValue) {
                    console.log(scope.guesses);
                    if (verifyHash(viewValue, scope.hashes[scope.$index].test.hash)) {
                        ctrl.$setValidity("hash", true);
                        return viewValue;
                    }
                    ctrl.$setValidity("hash", false);
                    return "";
                });
            }
        };
    });

    var verifyHash = function (test, validHash) {
        var hashBits = sjcl.hash.sha256.hash(test + "secretkeywhichisnotsecret");
        var hash = sjcl.codec.hex.fromBits(hashBits);
        console.log(hash);
        console.log(validHash);
        return hash === validHash;
    }

    hashApp.factory('localStorageService', ['$window', function ($window) {
        var service = {
            values: [],
            stats: [],
            correct: 0,
            total: 0,
            users: 1,
            best: 0,
            average: 0,
            SaveState: function () {
                $window.localStorage.guesses = angular.toJson(service.values);
                update();
            },
            RestoreState: function () {
                service.values = angular.fromJson($window.localStorage.guesses) || [];
                update();
            }
        }
        
        var update = function() {
            service.correct = service.values.reduce(function(pre, val) { return (val || "").length > 0 ? pre + 1 : pre; }, 0);
            service.total = (service.values || []).length;
        }

        
        return service;
    }]);

    hashApp.controller("FaqCtrl", function($scope) {
        $scope.hideSnipe = true;
    });

    hashApp.controller("HashListCtrl", function($scope, localStorageService, $http) {
        $scope.hashes = hashes;
        $scope.guesses = localStorageService;
        $scope.guesses.RestoreState();
        if ($scope.guesses.values.length === 0) {
            angular.forEach($scope.hashes, function(hashValue) {
                $scope.guesses.values.push("");
            });
            $scope.guesses.SaveState();
        }
      
        var populateStats = function(data) {
            $scope.guesses.users = data.all.users;
            $scope.guesses.best = data.all.best;
            $scope.guesses.average = data.all.average;
            $scope.guesses.stats = data.hash;
        };

        $scope.refreshResults = function() { 
            $http.get("/results").success(populateStats);
        }

        $scope.refreshResults();
 
        $scope.$watch(
            "guesses.values",
            function(newValue, oldValue) {
                console.log("guesses changed");
                if (newValue === oldValue) {
                    return;
                }
                $scope.guesses.SaveState();
            },
            true
        );
    });


})(angular, sjcl);
