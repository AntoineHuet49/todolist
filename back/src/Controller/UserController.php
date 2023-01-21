<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\PasswordHasher\PasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class UserController extends AbstractController
{
    /**
     * subscribe one user
     *
     * @param Request $request
     * @param UserRepository $userRepository
     * @param SerializerInterface $serializerInterface
     * @param UserPasswordHasherInterface $passwordHasherInterface
     * @return JsonResponse
     */
    #[Route('/api/subscribe', name: 'api_user_subscribe', methods: ["POST"])]
    public function subscribe(Request $request, UserRepository $userRepository, SerializerInterface $serializerInterface, UserPasswordHasherInterface $passwordHasherInterface): JsonResponse
    {
        $arrayContent = $request->toArray();

        // dd($request->getContent());

        if ($arrayContent["password"] !== $arrayContent["passwordVerification"]) {
            return $this->json(
                "Les Mots de passe sont differents",
                Response::HTTP_BAD_REQUEST
            );
        }

        try {
            $content = $request->getContent();
            $newUser = $serializerInterface->deserialize($content, User::class, 'json');

            $password = $arrayContent["password"];
            $hashedPassword = $passwordHasherInterface->hashPassword($newUser, $password);
            $newUser->setPassword($hashedPassword);

            $userRepository->save($newUser, true);
        }
        catch (Exception $e) {
            return $this->json(
                $e,
                Response::HTTP_BAD_REQUEST
            );
        }

        return $this->json(
            "L'utilisateur a bien été enrengistré"
        );
    }

    #[Route('/api/checktoken', name: 'api_user_checkToken', methods: ["GET"])]
    public function checkToken(): JsonResponse
    {
        return $this->json(
            true
        );
    }
}
